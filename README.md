# Multi-Store Stock Movement Project

This is a simple MERN application to manage stock in different stores. 

It has:
- Admin login and Shopper login.
- Product and Store creation.
- Initial stock setup, stock updates, and transfers between stores.
- A search filter to look up items below a threshold.

## Requirements

* Node.js
* MongoDB running locally

## Configuration

Make a file named `.env` in the `Backend` folder. Copy the contents of `Backend/.env.example` into it.

Variables:
* MONGOURI: MongoDB connection link.
* PORT: Port for backend server (using 1212).
* JWT_SECRET: Secret code for logins.
* JWT_EXPIRES_IN: Token expiry time (like 7d).

## How to Run

### Backend

1. Open a terminal and go to the `Backend` folder.
2. Install packages:
   `npm install`
3. Run the backend:
   `npm run dev`

### Frontend

1. Open another terminal and go to the `Frontend` folder.
2. Install packages:
   `npm install`
3. Run the frontend:
   `npm run dev`
4. Open `http://localhost:5173` in your browser.

## How to Run Tests

1. Go to the `Backend` folder.
2. Run the tests:
   `npm test`

These tests verify:
- Moving stock from Store A to Store B.
- Stopping transfers if there is not enough stock.
- Stopping concurrent requests from making stock go negative.

## Simple Choices and Assumptions

1. **Rollback instead of sessions**: Standard local MongoDB databases do not support transactions unless configured as replica sets. To make it work on any simple MongoDB setup, we manually add the stock back if a transfer operation fails halfway.
2. **Database unique check**: We use Mongoose's unique option in the product schema to make sure SKU values are unique.
3. **Admin Check**: We use simple login checks on frontend pages and token checks on backend endpoints.
