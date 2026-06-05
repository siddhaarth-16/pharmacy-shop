# Pharmacy Shop - Full Stack E-commerce Platform

A comprehensive full-stack pharmacy management and e-commerce website built with Node.js, Express, and MySQL.

## Features

### Customer Features
- User registration and login
- Browse pharmacy products
- Search and filter medicines
- Shopping cart management
- Order placement
- Order history tracking

### Admin Features
- Product management (add, update, delete)
- Inventory tracking
- Order management
- Order status updates
- Sales dashboard

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- BCrypt for password hashing

**Database:**
- MySQL

## Project Structure

```
pharmacy-shop/
├── config/
│   └── database.js          # Database connection
├── database/
│   └── schema.sql           # Database schema
├── routes/
│   ├── users.js             # User authentication routes
│   ├── products.js          # Product routes
│   ├── orders.js            # Order routes
│   └── admin.js             # Admin routes
├── public/
│   ├── index.html           # Main HTML file
│   ├── styles.css           # Styling
│   └── script.js            # Frontend JavaScript
├── .env.example             # Environment variables example
├── package.json             # Node.js dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddhaarth-16/pharmacy-shop.git
   cd pharmacy-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup Database:**
   - Create a MySQL database:
   ```sql
   CREATE DATABASE pharmacy_shop;
   ```
   - Import the schema:
   ```bash
   mysql -u root -p pharmacy_shop < database/schema.sql
   ```

4. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=pharmacy_shop
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5000`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile/:id` - Get user profile

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search/query?q=search` - Search products

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:user_id` - Get user orders

### Admin Routes
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

## Usage

### For Customers:
1. Register or login
2. Browse products
3. Search for specific medicines
4. Add items to cart
5. Checkout and place order

### For Admin:
1. Login with admin account
2. Access admin panel
3. Manage products (add, edit, delete)
4. Manage orders and update status
5. Track inventory

## Future Enhancements
- Payment gateway integration
- Email notifications
- Advanced inventory management
- User reviews and ratings
- Prescription upload feature
- SMS notifications
- Mobile app version

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the MIT License.

## Support
For support or questions, please create an issue in the GitHub repository.

---

**Made with ❤️ for your pharmacy business**
