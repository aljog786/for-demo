"use client";

import { useEffect, useState, useCallback } from "react";
import CreateAndUpdateModal from "@/components/CreateAndUpdateModal";
import Products from "@/components/Products";
import { Product } from "@/types/product";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  // const [ modal,setModal ] = useState();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };
    loadProducts();

    // Listen for storage events to refresh products when changes happen
    const handleStorageChange = () => {
      fetchProducts();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [fetchProducts]);

  const createButtonHandler = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    fetchProducts();
  };

  return (
    <div className="grid h-dvh grid-cols-12 gap-2 p-2 overflow-hidden">
      <div className="col-span-8 h-full rounded-md bg-gray-100">
        {isLoading ? (
          <p className="p-4 text-gray-500">Loading products...</p>
        ) : (
          <Products productsData={products} />
        )}
      </div>
      <button
        className="col-span-4 h-10 rounded-md bg-gray-500"
        onClick={createButtonHandler}

      >
        Create
      </button>

      {openModal && (
        <CreateAndUpdateModal onClose={handleModalClose} />
      )}
    </div>
  );
}
