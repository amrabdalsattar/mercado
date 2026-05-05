import { Types } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { slugify } from "@/lib/utils";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function listCategories() {
  await connectDB();
  return Category.find({}).sort({ name: 1 }).lean(false);
}

export async function createCategory({ name, description }) {
  await connectDB();
  return Category.create({
    name,
    slug: slugify(name),
    description,
  });
}

export async function listProducts(filters = {}) {
  await connectDB();

  const query = { isActive: true };

  if (filters.category) {
    const category = await Category.findOne({ slug: filters.category }).select("_id");
    if (category) {
      query.category = category._id;
    } else {
      return [];
    }
  }

  if (filters.q) {
    query.$text = { $search: filters.q };
  }

  if (filters.availability === "in-stock") {
    query.stock = { $gt: 0 };
  }

  if (filters.price === "under-100") {
    query.price = { $lt: 100 };
  }

  if (filters.price === "100-300") {
    query.price = { $gte: 100, $lte: 300 };
  }

  const sort =
    filters.sort === "price-asc"
      ? { price: 1 }
      : filters.sort === "price-desc"
        ? { price: -1 }
        : filters.sort === "rating"
          ? { "ratings.average": -1 }
          : filters.sort === "newest"
            ? { createdAt: -1 }
            : { featured: -1, createdAt: -1 };

  return Product.find(query)
    .populate("category", "name slug")
    .populate("seller", "name")
    .sort(sort)
    .lean(false);
}

export async function listFeaturedProducts(limit = 4) {
  await connectDB();
  return Product.find({ isActive: true })
    .populate("category", "name slug")
    .populate("seller", "name")
    .sort({ featured: -1, createdAt: -1 })
    .limit(limit)
    .lean(false);
}

export async function getProductBySlug(slug) {
  await connectDB();
  return Product.findOne({ slug, isActive: true })
    .populate("category", "name slug")
    .populate("seller", "name")
    .lean(false);
}

export async function getRelatedProducts(categoryId, productId) {
  await connectDB();
  return Product.find({
    category: new Types.ObjectId(categoryId),
    _id: { $ne: new Types.ObjectId(productId) },
    isActive: true,
  })
    .populate("category", "name slug")
    .populate("seller", "name")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean(false);
}

export async function createProduct(input, sellerId) {
  await connectDB();
  return Product.create({
    name: input.name,
    slug: slugify(input.name),
    description: input.description,
    price: input.price,
    salePrice: input.salePrice || null,
    stock: input.stock,
    category: input.categoryId,
    seller: sellerId,
    coverImage: input.coverImage,
    featured: input.featured,
  });
}

export async function listProductsBySeller(sellerId) {
  await connectDB();
  return Product.find({ seller: sellerId, isActive: true })
    .populate("category", "name slug")
    .populate("seller", "name")
    .sort({ createdAt: -1 })
    .lean(false);
}

export async function updateProduct(slug, input) {
  await connectDB();
  return Product.findOneAndUpdate(
    { slug },
    {
      $set: {
        name: input.name,
        slug: slugify(input.name),
        description: input.description,
        price: input.price,
        salePrice: input.salePrice || null,
        stock: input.stock,
        category: input.categoryId,
        coverImage: input.coverImage,
        featured: input.featured,
      },
    },
    { new: true }
  )
    .populate("category", "name slug")
    .populate("seller", "name")
    .lean(false);
}

export async function deleteProduct(slug) {
  await connectDB();
  return Product.findOneAndUpdate({ slug }, { $set: { isActive: false } }, { new: true }).lean(
    false
  );
}
