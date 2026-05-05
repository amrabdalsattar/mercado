import { Types } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

async function getOrCreateCart(userId) {
  await connectDB();
  let cart = await Cart.findOne({ user: userId }).populate("items.product").lean(false);

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await Cart.findById(cart._id).populate("items.product").lean(false);
  }

  return cart;
}

export async function getCartForUser(userId) {
  return getOrCreateCart(userId);
}

export async function addCartItem(userId, productId, quantity) {
  await connectDB();
  const product = await Product.findById(productId).lean(false);

  if (!product || !product.isActive) {
    throw new Error("Product not found.");
  }

  const cart = await getOrCreateCart(userId);
  const existing = cart.items.find((item) => item.product._id.toString() === productId);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    cart.items.push({
      product: new Types.ObjectId(productId),
      quantity: Math.min(quantity, product.stock || quantity),
    });
  }

  await cart.save();
  return Cart.findById(cart._id).populate("items.product").lean(false);
}

export async function updateCartItem(userId, itemId, quantity) {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);

  if (!item) {
    throw new Error("Cart item not found.");
  }

  item.quantity = quantity;
  await cart.save();
  return Cart.findById(cart._id).populate("items.product").lean(false);
}

export async function removeCartItem(userId, itemId) {
  const cart = await getOrCreateCart(userId);
  cart.items.pull({ _id: itemId });
  await cart.save();
  return Cart.findById(cart._id).populate("items.product").lean(false);
}

export async function clearCart(userId) {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
}
