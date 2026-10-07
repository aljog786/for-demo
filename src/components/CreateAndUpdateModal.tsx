"use client";

import { useState, useEffect, useCallback } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { Product } from "@/types/product";

interface CreateAndUpdateModalProps {
  onClose?: () => void;
  onEdit?: () => void;
  productToEdit?: Product | null;
}

export default function CreateAndUpdateModal({ onClose, productToEdit }: CreateAndUpdateModalProps) {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = useCallback(() => {
    if (productToEdit) {
      setProductName(productToEdit.productName);
      setBrand(productToEdit.brand);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setDescription(productToEdit.description);
    } else {
      setProductName("");
      setBrand("");
      setCategory("");
      setPrice("");
      setStock("");
      setDescription("");
    }
  }, [productToEdit]);

  useEffect(() => {
    const initializeForm = () => {
      resetForm();
    };
    initializeForm();
  }, [resetForm]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData = {
      id: productToEdit?.id || Date.now(),
      productName,
      brand,
      category,
      price,
      stock,
      description,
      createdAt: productToEdit?.createdAt || new Date().toISOString(),
    };

    console.log("Product Data:", productData);

    // Save to browser localStorage
    try {
      const existingData = localStorage.getItem("products");
      console.log("",);
      const products: Product[] = existingData ? JSON.parse(existingData) : [];
      // console.log("",);
      let updatedProducts: Product[];
      if (productToEdit) {
        updatedProducts = Array.isArray(products)
          ? products.map((p: Product) => p.id === productToEdit.id ? productData : p)
          : [productData];
      } else {
        updatedProducts = Array.isArray(products)
          ? [...products, productData]
          : [productData];
      }
      // console.log("",);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Failed to save product to localStorage:", error);
    }

    // Save to Products/Products.json file via API
    try {
      setIsSaving(true);
      const method = productToEdit ? "PUT" : "POST";
      const res = await fetch("/api/products", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${productToEdit ? "update" : "save"} product to Products.json`);
      }
    } catch (error) {
      console.error(`Failed to ${productToEdit ? "update" : "save"} product to Products.json:`, error);
    } finally {
      setIsSaving(false);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          {/* Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {productToEdit ? "Edit Product" : "Create New Product"}
            </h1>

            <p className="mt-0.5 text-xs text-gray-500">
              {productToEdit ? "Update product details and save" : "Add product details and save"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Save */}
            <button
              type="submit"
              form="create-product-form"
              disabled={isSaving}
              aria-label="Save product"
              title="Save product"
              className="
        flex h-9 w-9 items-center justify-center
        rounded-lg
        bg-blue-600
        text-white
        transition
        duration-200
        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/30
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
            >
              <FaSave className="text-base" />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              title="Close"
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
              <IoIosCloseCircle className="text-xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          id="create-product-form"
          onSubmit={submitHandler}
          className="overflow-y-auto text-black"
        >
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Product Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="productName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Product Name <span className="text-red-500">*</span>
              </label>

              <input
                id="productName"
                type="text"
                name="productName"
                value={productName}
                placeholder="Enter product name"
                onChange={(e) => setProductName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>    

            {/* Brand */}
            <div>
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Brand
              </label>

              <input
                id="brand"
                type="text"
                name="brand"
                value={brand}
                placeholder="Enter brand name"
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category <span className="text-red-500">*</span>
              </label>

              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>
                  Select Category
                </option>

                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price <span className="text-red-500">*</span>
              </label>

              <input
                id="price"
                type="number"
                name="price"
                value={price}
                placeholder="Enter price per unit"
                min="0"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>

              <input
                id="stock"
                type="number"
                name="stock"
                value={stock}
                placeholder="0"
                min="0"
                onChange={(e) => setStock(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={description}
                placeholder="Enter product description..."
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}