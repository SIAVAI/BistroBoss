# 🍽️ BistroBoss

Bistro Boss is a comprehensive restaurant management website built using the MERN stack (MongoDB, Express.js, React with Vite, and Node.js). This application aims to streamline restaurant operations, providing an intuitive interface for managing reservations, orders, menus, and staff.

---

🔗 **Live Site:** [https://bistroboss-e45f6.web.app](https://bistroboss-e45f6.web.app)

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Reservation Management**: View, create, and manage customer reservations.
- **Order Management**: Track and manage orders in real-time.
- **Menu Management**: Add, update, and remove menu items.
- **Staff Management**: Manage staff roles and schedules.
- **Dashboard**: Get a visual overview of key metrics and restaurant performance using charts.

### 🔐 Authentication

- Firebase-based user login/signup
- Route protection for admin and user dashboards

### 📊 Admin Dashboard

- Overview cards: Total Users, Revenue, Orders, Menu Items
- Bar Chart: Collection statistics
- Pie Chart: Revenue by food category
- User Purchase Chart: Total amount spent by each user

### 🙋‍♀️ User Dashboard

- Welcome screen with personalized stats
- Pie Chart visualization of:
  - Total Orders
  - Total Payments
  - Total Reservations
  - Total Reviews

### 💳 Payments

- Stripe integration for secure payment processing

---

## 📦 Tech Stack

### Frontend

- ⚛️ React 19
- 🎨 Tailwind CSS + DaisyUI
- 📦 React Query (TanStack) for data fetching and caching
- 📈 Recharts for responsive data visualizations
- 🔐 Firebase Authentication
- 💸 Stripe for payments

### Backend

- Node.js + Express (custom API endpoints)
- MongoDB with aggregation pipelines for data analytics

---

## 📊 Charts and Stats Endpoints

### Admin Stats: `/admin-stats`

Returns:

```json
{
  "users": 4,
  "menu": 64,
  "orders": 3,
  "revenue": 23060
}
```

### Category Stats: `/category-stats`

Returns:

```json
[
  { "category": "salad", "quantity": 9, "totalRevenue": 117.9 },
  ...
]
```

### User Purchase: `/user-payments`

Returns:

```json
[
  { "email": "user@example.com", "amount": 8210 },
  ...
]
```

### User Home Stats: `/user-home-stats?email=user@example.com`

Returns:

```json
{
  "orders": 3,
  "payments": 2,
  "reservations": 1,
  "reviews": 4
}
```

<img src="./landing-structure.png">
