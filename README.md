# ShopSeeker – Online Grocery Delivery Platform

**ShopSeeker** is an online grocery delivery platform designed to provide a seamless shopping experience for common users, delivery personnel, and merchants. The platform supports real-time notifications, secure payments via **Stripe**, and integrates modern frontend technologies to deliver a responsive, fast, and dynamic user experience.

It also allows users to sign in using **Facebook**, **Google**, and **Apple** for easy and secure authentication.


---

## 🚀 Features

### 👤 User Module
- Browse and order groceries from local merchants.
- View detailed product information and availability.
- Add items to the cart, manage the cart, and place orders.
- Track order status and delivery in real-time.
- Sign-In with Facebook, Google, and Apple** for quick access.

### 🚚 Delivery Module
- Deliver orders from merchants to users in a timely manner.
- Manage delivery schedules and keep users updated on their order status.
- In-time notifications for order acceptance, preparation, and delivery.

### 🛒 Merchant Module
- List grocery items for sale, manage inventory, and set prices.
- Receive and manage customer orders.
- View order history and track deliveries.

### 💳 Payment Integration
- Secure payments via **Stripe** for handling transactions.
- Easy and fast checkout process.
- Support for various payment methods (credit/debit cards).

### ⚡ Real-Time Notifications
- In-time updates for all users, merchants, and delivery personnel using **Socket.io**.
- Get notified about new orders, delivery status, and promotional offers.

### 🔐 Authentication via Facebook, Google, and Apple
- Simplified login process using **Facebook**, **Google**, and **Apple** authentication.
- Secure user accounts with OAuth-based authentication.

---

## 🛠️ Tech Stack

- **Frontend**: 
  - **Next.js** – React-based framework for server-side rendering and static site generation.
  - **Redux** – State management for the frontend.
  - **Redux-Saga** – Middleware for handling side effects (e.g., API calls, background tasks).
  - **GraphQL** – Query language for fetching data from the backend efficiently.
  - **Socket.io** – Real-time bi-directional communication for notifications.
  - **OAuth Integration** – Facebook, Google, and Apple authentication services.

- **Backend**: 
  - **Node.js** with **Express** – Server-side JavaScript and RESTful API.
  - **Stripe** – Payment processing service for handling transactions.
  - **PostgreSQL** or **MongoDB** – Database for managing user, order, and merchant data.
  - **Socket.io** – Real-time messaging between users, merchants, and delivery personnel.

- **Deployment**: 
  - **Vercel / Netlify** – For deploying the Next.js frontend.
  - **Heroku / AWS** – For deploying the backend services.
  - **Docker** – Containerized deployment for consistent environments.

---

## 📦 Installation

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn (for managing packages)
- Stripe account for payment integration
- Facebook, Google, and Apple developer accounts for OAuth integration
- PostgreSQL or MongoDB for database setup
- Redis (optional, for caching or managing sessions)

### 1. Clone the Repository

```bash
git clone https://github.com/daddyauden/shopseeker.git
cd shopseeker
````

### 2. Install Dependencies

Install both frontend and backend dependencies:

```bash
npm install
```

### 3. Set up Environment Variables

update `.env.development` file with the following environment variables:

```bash
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

APPLE_CLIENT_ID=
APPLE_CLIENT_SECRET=

STRIPE_PUBLISHABLE_KEY=
```

### 4. Start the Development Servers
```bash
npm run dev
```

Your application should now be running locally at `http://localhost:3000`

---

## 🧪 Testing

To run the tests:

```bash
npm run test
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the GNU License. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

* [Next.js](https://nextjs.org) for providing an excellent framework for React.
* [Redux](https://redux.js.org) for efficient state management.
* [Stripe](https://stripe.com) for seamless payment processing.
* [Socket.io](https://socket.io) for real-time notifications.
* [GraphQL](https://graphql.org) for efficient data fetching.

```
