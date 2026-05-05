import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function listOrdersForUser(userId) {
  await connectDB();
  return Order.find({ user: userId }).sort({ createdAt: -1 }).lean(false);
}

export async function listOrdersForAdmin() {
  await connectDB();
  return Order.find({}).populate("user", "name email").sort({ createdAt: -1 }).lean(false);
}

export async function createOrderFromCart(userId, shippingAddress) {
  await connectDB();
  const cart = await Cart.findOne({ user: userId }).populate("items.product").lean(false);

  if (!cart || cart.items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const items = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.salePrice ?? item.product.price,
    quantity: item.quantity,
  }));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 300 ? 0 : 18;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new Error(`${item.product.name} does not have enough stock.`);
    }
  }

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    subtotal,
    tax,
    shippingCost,
    total,
  });

  cart.items = [];
  await cart.save();

  return order;
}

export async function updateOrderStatus(orderId, status) {
  await connectDB();
  return Order.findByIdAndUpdate(orderId, { $set: { status } }, { new: true }).lean(false);
}
