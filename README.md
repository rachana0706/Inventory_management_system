# Inventory Management System

**By Rachana**

This is a simple Inventory Management System made as a full-stack project. It can be used to add products, view products, update product details and delete products.

The project also has search and category filtering options. Products which have low stock are highlighted so that they can be easily identified.

## Features

* Add a new product
* View all products
* Edit product details
* Delete products
* Search products by name
* Filter products by category
* Show low-stock products
* Highlight products when their stock is low

## Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* React.js
* Axios
* CSS

## Project Structure

```text
inventory-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.js
│   │   │   ├── ProductTable.js
│   │   │   └── Filters.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## How to Run the Project

### Requirements

Before running the project, make sure these are installed:

* Node.js
* MongoDB
* npm

### Step 1: Run the Backend

Open the terminal and go to the backend folder.

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

If MongoDB is running on the computer, the default connection can be used.

Then start the server:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Step 2: Run the Frontend

Open another terminal and go to the frontend folder.

```bash
cd frontend
npm install
npm start
```

The React application will open at:

```text
http://localhost:3000
```

The frontend connects to the backend using Axios.

## API Endpoints

| Method | Endpoint              | Purpose                |
| ------ | --------------------- | ---------------------- |
| POST   | `/products`           | Add a new product      |
| GET    | `/products`           | Get all products       |
| GET    | `/products/low-stock` | Get low-stock products |
| GET    | `/products/:id`       | Get one product        |
| PUT    | `/products/:id`       | Update a product       |
| DELETE | `/products/:id`       | Delete a product       |

The `GET /products` API also supports searching and category filtering.

Example:

```text
/products?search=mouse
```

or

```text
/products?category=Electronics
```

## Product Details

Each product contains the following information:

```json
{
  "id": "665f1c2e...",
  "name": "Wireless Mouse",
  "category": "Electronics",
  "price": 799,
  "quantity": 12,
  "minStock": 5
}
```

Where:

* **name** – Name of the product
* **category** – Category of the product
* **price** – Price of the product
* **quantity** – Available quantity
* **minStock** – Minimum quantity that should be available

## Low Stock

The application checks the current quantity of a product with its minimum stock value.

For example:

```text
Quantity = 3
Minimum Stock = 5
```

Since the quantity is less than the minimum stock, the product is considered **low stock**.

The low-stock products are highlighted in the frontend.

## Search and Filter

The application has a search box to find products by their name.

There is also a category filter which can be used to show products belonging to a particular category.

A low-stock option is also available to show only products that need restocking.

## Error Handling

Some basic error handling has been added to the project.

* Required product fields are checked.
* Negative values for price and quantity are not allowed.
* Invalid product IDs show an error.
* If a product does not exist, a `404` error is returned.
* Invalid requests return an appropriate error message.
* Unexpected server errors return a `500` error.

The frontend also displays error messages when something goes wrong.

## Database

MongoDB is used to store the product information.

Mongoose is used in the backend to create the Product model and communicate with MongoDB.

The MongoDB database can either be run locally or a MongoDB Atlas connection can be used.

## About the Project

The main purpose of this project was to understand how a frontend and backend application work together.

The React frontend sends requests to the Node.js/Express backend. The backend handles the requests and stores or retrieves the product data from MongoDB.

This project helped me understand basic CRUD operations, REST APIs, MongoDB, React components and connecting frontend with backend.
