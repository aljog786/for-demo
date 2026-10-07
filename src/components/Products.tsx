"use client";
import Link from "next/link";
import { Product } from "@/types/product";

export default function Products({ productsData }: { productsData?: Product[] }) {
  const products = productsData || [];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product: Product) => (
  <Link href={`/products/${product.id}`}
    key={product.id}
    className="rounded-lg bg-yellow-600 p-5 shadow-sm transition hover:bg-yellow-700"
  >
    <h1 className="mb-2 text-lg font-semibold text-gray-900">
      {product.productName}
    </h1>

    <h4 className="mb-1 text-sm font-medium text-gray-600">
      Brand: <span className="font-normal">{product.brand}</span>
    </h4>

    <h6 className="text-sm text-gray-500">
      Category: <span className="font-normal">{product.category}</span>
    </h6>
  </Link>
))
      )}
    </div>
  );
}
