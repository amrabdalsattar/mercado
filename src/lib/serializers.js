export function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export function serializeCategory(category) {
  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    description: category.description,
  };
}

export function serializeProduct(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    salePrice: product.salePrice,
    stock: product.stock,
    coverImage: product.coverImage,
    featured: product.featured,
    isActive: product.isActive,
    rating: product.ratings?.average ?? 0,
    reviewsCount: product.ratings?.count ?? 0,
    category: product.category?.name ?? "",
    categorySlug: product.category?.slug ?? "",
    categoryId: product.category?._id?.toString?.() ?? "",
    sellerId: product.seller?._id?.toString?.() ?? product.seller?.toString?.() ?? "",
    sellerName: product.seller?.name ?? "",
    createdAt: product.createdAt,
  };
}

export function serializeCart(cart) {
  return {
    id: cart._id.toString(),
    userId: cart.user.toString(),
    items: cart.items.map((item) => ({
      id: item._id.toString(),
      productId: item.product._id.toString(),
      productSlug: item.product.slug,
      name: item.product.name,
      price: item.product.salePrice ?? item.product.price,
      quantity: item.quantity,
      stock: item.product.stock,
    })),
  };
}

export function serializeOrder(order) {
  return {
    id: order._id.toString(),
    status: order.status,
    subtotal: order.subtotal,
    tax: order.tax,
    shippingCost: order.shippingCost,
    total: order.total,
    createdAt: order.createdAt,
    shippingAddress: order.shippingAddress,
    items: order.items.map((item) => ({
      productId: item.product.toString(),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };
}
