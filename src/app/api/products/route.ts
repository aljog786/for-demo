import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/product";

const productsFilePath = path.join(process.cwd(), "Products", "Products.json");
console.log("productsFilePath",productsFilePath)

function getProductsFromFile(): Product[] {
  try {
    if (!fs.existsSync(productsFilePath)) {
      return [];
    }
    const fileData = fs.readFileSync(productsFilePath, "utf8").trim();
    if (!fileData) {
      return [];
    }
    const parsed = JSON.parse(fileData);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Error reading Products.json:", error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("SearchParams",searchParams)
  const id = searchParams.get('id');

  const products = getProductsFromFile();
  console.log("ProductsFromFile",products)

  if (id) {
    const product = products.find((p) => p.id === Number(id));
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  return NextResponse.json(products);
}



export async function POST(request: Request) {
  try {
    const productData = await request.json();

    const dir = path.dirname(productsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const products = getProductsFromFile();
    products.push(productData);

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");

    return NextResponse.json(
      { success: true, product: productData, products },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error saving product to Products.json:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to save product";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const productData = await request.json();

    const dir = path.dirname(productsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const products = getProductsFromFile();
    const updatedProducts = products.map((p) =>
      p.id === productData.id ? productData : p
    );

    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2), "utf8");

    return NextResponse.json(
      { success: true, product: productData, products: updatedProducts },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating product in Products.json:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update product";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const products = getProductsFromFile();
    const updatedProducts = products.filter((p) => p.id !== Number(id));

    fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2), "utf8");

    return NextResponse.json(
      { success: true, message: "Product deleted successfully", products: updatedProducts },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting product from Products.json:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete product";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
