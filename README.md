## E-Shop

A modern and responsive e-commerce platform built using React.js, designed to provide a seamless shopping experience for customers.

### Features

- User-friendly homepage showcasing featured products and categories
- Product listing page with filtering and sorting options
- Product detail page with images, descriptions, and add-to-cart functionality
- Shopping cart and checkout process with secure payment integration
- User authentication and registration system
- Order history and profile management for customers
- Admin panel for managing products, orders, and user accounts
- Real-time notifications for order updates and promotions
- Responsive design for optimal viewing on various devices

### Some Technologies Used

- **React.js**: JavaScript library for building the user interface
- **React Router**: For handling client-side routing
- **Redux**: For managing application state
- **Axios**: For making HTTP requests to the backend API
- **Node.js**: For the backend server and API
- **Express**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing product, order, and user data


### Get Started with E-Shop

1. **Clone the repository**:
   ```
   git clone https://github.com/tewereus/e-shop.git
   ```
2. **Install dependencies**:
   ```
   cd e-shop
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory
   - Add the necessary environment variables listed below:

    ```
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = 
    
    JWT_SECRET_TOKEN = 
    JWT_REFRESH_TOKEN = 
    
    MAIL_ID =
    MP = 
    
    # Cloudinary
    CLOUD_NAME = 
    API_KEY = 
    API_SECRET = 
    ```
4. **Start the development server**:
   ```
   npm start
   ```
5. **Open the application in your browser at `http://localhost:3000`**

### Join the E-Shop Community

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. Together, let's shape the future of e-commerce.
