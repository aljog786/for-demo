# 🛒 Product Management System

A full-stack Product Management System built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This application allows users to create, view, edit, and delete products with a modern, responsive interface.

## 🎯 Features

- ✅ **Create Products** - Add new products with details (name, brand, category, price, stock, description)
- ✅ **View Products** - Display all products in a responsive grid layout (1/2/4 columns based on screen size)
- ✅ **Product Details** - View detailed information about each product
- ✅ **Edit Products** - Update existing product information via modal
- ✅ **Delete Products** - Remove products with confirmation dialog
- ✅ **Real-time Updates** - Changes reflect immediately using localStorage events
- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ✅ **Type Safety** - Full TypeScript support for better code quality

## 🛠️ Tech Stack

| Technology       | Version | Purpose                                                    |
| ---------------- | ------- | ---------------------------------------------------------- |
| **Next.js**      | 16.3.8  | React framework with App Router for routing and API routes |
| **React**        | 19.2.8  | UI library for building interactive components             |
| **TypeScript**   | 5       | Type-safe JavaScript for better code quality               |
| **Tailwind CSS** | 4       | Utility-first CSS framework for styling                    |
| **React Icons**  | 5.7.0   | Icon library (edit, trash, close, save icons)              |

## 📁 Project Structure

```
for-training/
├── Products/                          # External data storage folder
│   └── Products.json                 # Persistent product database
├── public/                            # Static assets (SVG icons)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── api/
│   │   │   └── products/
│   │   │       └── route.ts          # API endpoints (GET, POST, PUT, DELETE)
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Product details page (dynamic route)
│   │   ├── favicon.ico
│   │   ├── globals.css               # Global styles & Tailwind config
│   │   ├── layout.tsx                # Root layout with fonts
│   │   └── page.tsx                  # Home page (product list)
│   ├── components/
│   │   ├── CreateAndUpdateModal.tsx  # Modal for creating/editing products
│   │   └── Products.tsx              # Product grid display component
│   ├── data/
│   │   └── products.json             # Initial product data
│   └── types/
│       └── product.ts                # TypeScript interface for Product
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎮 User Guide

### Home Page (`/`)

The home page displays all products in a responsive grid layout:

- **Create Button**: Opens a modal to add a new product
- **Product Cards**: Click on any product card to view its details
- **Responsive Grid**: 1 column on mobile, 2 on tablet, 4 on desktop

### Product Details Page (`/products/[id]`)

Each product has a dedicated details page showing:

- Product name, brand, and category
- Price and stock quantity
- Product description
- Creation timestamp
- **Edit Button**: Opens modal to update product information
- **Delete Button**: Removes the product with confirmation
- **Back Button**: Returns to the product list

### Create/Update Modal

The modal is used for both creating and editing products:

- **Form Fields**: Product name, brand, category, price, stock, description
- **Category Dropdown**: Pre-defined categories (Electronics, Clothing, Furniture, Food, Other)
- **Save Button**: Submits the form and saves the product
- **Close Button**: Cancels the operation

## 🔌 API Endpoints

### GET `/api/products`

Fetches all products or a single product by ID.

**Query Parameters:**

- `id` (optional): Product ID to fetch a specific product

**Response:**

```json
{
  "id": 1791055676176,
  "productName": "Example Product",
  "brand": "Brand Name",
  "category": "electronics",
  "price": "100",
  "stock": "50",
  "description": "Product description",
  "createdAt": "2026-10-03T19:27:56.176Z"
}
```

### POST `/api/products`

Creates a new product.

**Request Body:**

```json
{
  "productName": "New Product",
  "brand": "Brand",
  "category": "electronics",
  "price": "150",
  "stock": "25",
  "description": "Description",
  "createdAt": "2026-10-06T00:00:00.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "product": { ... },
  "products": [ ... ]
}
```

### PUT `/api/products`

Updates an existing product.

**Request Body:**

```json
{
  "id": 1791055676176,
  "productName": "Updated Product",
  "brand": "Updated Brand",
  "category": "clothing",
  "price": "200",
  "stock": "30",
  "description": "Updated description",
  "createdAt": "2026-10-03T19:27:56.176Z"
}
```

**Response:**

```json
{
  "success": true,
  "product": { ... },
  "products": [ ... ]
}
```

### DELETE `/api/products?id={id}`

Deletes a product by ID.

**Query Parameters:**

- `id` (required): Product ID to delete

**Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "products": [ ... ]
}
```

## 🧩 Components

### Products Component (`src/components/Products.tsx`)

Displays products in a responsive grid layout. Each product is a clickable card that navigates to the product details page.

**Props:**

- `productsData`: Array of Product objects

### CreateAndUpdateModal Component (`src/components/CreateAndUpdateModal.tsx`)

A reusable modal component for creating and editing products. It automatically detects whether it's in "create" or "edit" mode based on the `productToEdit` prop.

**Props:**

- `onClose`: Function to close the modal
- `productToEdit`: Product object (optional - if provided, modal opens in edit mode)

## 🎨 Styling

The project uses Tailwind CSS for styling with the following features:

- **Responsive Design**: Mobile-first approach with breakpoints
- **Custom Colors**: Yellow cards for products, gray backgrounds
- **Dark Mode Support**: Automatic color scheme switching
- **Utility Classes**: Consistent spacing, typography, and layout

## 💾 Data Storage

The application uses two storage mechanisms:

1. **localStorage**: Browser storage for immediate UI updates
2. **JSON File** (`Products/Products.json`): Persistent server-side storage

Data is synchronized between both storage systems to ensure consistency.

## 🔑 Key Concepts

### State Management

```typescript
const [openModal, setOpenModal] = useState(false);
```

### useEffect Hook

```typescript
useEffect(() => {
  fetchProducts();
}, [params.id]);
```

### Dynamic Routes

```typescript
// File: src/app/products/[id]/page.tsx
const params = useParams(); // { id: "123" }
```

### localStorage Operations

```typescript
// Save
localStorage.setItem("products", JSON.stringify(products));

// Load
const data = localStorage.getItem("products");
const products = JSON.parse(data);
```

## 📝 TypeScript Interface

```typescript
interface Product {
  id: number;
  productName: string;
  brand: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  createdAt: string;
}
```

## 🐛 Troubleshooting

### Products not saving

- Check if `Products/Products.json` file exists
- Verify write permissions on the `Products` folder
- Check browser console for errors

### API errors

- Ensure the development server is running
- Check that the API route file exists at `src/app/api/products/route.ts`
- Verify the request method matches the endpoint (GET, POST, PUT, DELETE)

### Styling issues

- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in `layout.tsx`
- Verify Tailwind class names are correct

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy with one click

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- **Netlify**: With Next.js build support
- **Railway**: Full-stack deployment
- **DigitalOcean App Platform**: Container-based deployment
- **AWS**: Using Amplify or EC2

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React concepts
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - TypeScript guide
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.
