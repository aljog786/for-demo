"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaEdit,FaTrash } from "react-icons/fa";
import CreateAndUpdateModal from "@/components/CreateAndUpdateModal";
import { Product } from "@/types/product";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?id=${params.id}`);
      if (!res.ok) {
        throw new Error("Product not found");
      }
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        await fetchProduct();
      }
    };
    loadProduct();
  }, [params.id, fetchProduct]);

  const editButtonHandler = () => {
    setOpenUpdateModal(true);
  };

  const handleModalClose = () => {
    setOpenUpdateModal(false);
    if (params.id) {
      fetchProduct();
    }
  };

  const deleteButtonHandler = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Delete from localStorage
      const existingData = localStorage.getItem("products");
      if (existingData) {
        const products: Product[] = JSON.parse(existingData);
        const updatedProducts = products.filter((p) => p.id !== Number(params.id));
        localStorage.setItem("products", JSON.stringify(updatedProducts));
      }

      // Delete from API
      const res = await fetch(`/api/products?id=${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      // Redirect to home page after successful deletion
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error || "Product not found"}</p>
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <div className="flex justify-between">
          <Link
          href="/"
          className="mb-6 inline-block text-blue-600 hover:text-blue-700"
        >
          ← Back
        </Link>
        <div className="flex gap-2">
          <button
              type="button"
              onClick={editButtonHandler}
              className="
        flex h-9 w-9 items-center justify-center
        rounded-lg
        text-gray-400
        transition
        duration-200
        hover:bg-gray-100
        hover:text-gray-700
        focus:outline-none
        focus:ring-2
        focus:ring-gray-300
        active:scale-95
      "
            >
              <FaEdit className="text-xl"/>
            </button> 
        {/* <FaTrash color="blue"/> */}
        <button
              type="button"
              onClick={deleteButtonHandler}
              className="
        flex h-9 w-9 items-center justify-center
        rounded-lg
        text-gray-400
        transition
        duration-200
        hover:bg-gray-100
        hover:text-gray-700
        focus:outline-none
        focus:ring-2
        focus:ring-gray-300
        active:scale-95
      "
            >
              <FaTrash className="text-xl"/>
            </button> 
        </div>
        
        </div>

       

        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          {product.productName}
        </h1>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Brand
            </h3>
            <p className="text-lg text-gray-900">{product.brand}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Category
            </h3>
            <p className="text-lg text-gray-900">{product.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">
                Price
              </h3>
              <p className="text-lg text-gray-900">₹{product.price}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">
                Stock
              </h3>
              <p className="text-lg text-gray-900">{product.stock} units</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Description
            </h3>
            <p className="text-lg text-gray-900">{product.description || "No description available"}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">
              Created At
            </h3>
            <p className="text-sm text-gray-600">
              {new Date(product.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {openUpdateModal && (
        <CreateAndUpdateModal
          onClose={handleModalClose}
          productToEdit={product}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Delete Product
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete &ldquo;{product?.productName}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
