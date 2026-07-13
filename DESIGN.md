# Design Document

## Data Model

We have five tables in our database:

1. **User**: Stores people who log in. Has name, email, password (hashed), and role (admin or Shopper).
2. **Product**: Stores products. Has name and unique SKU.
3. **Store**: Stores different store locations. Has name.
4. **Stock**: Links products to stores and tracks the quantity.
5. **Transfer**: Stores logs of stock moved between stores.

## Preventing Negative Stock (No Negative Stock)

To make sure stock quantity never goes below zero, we check the quantity inside the MongoDB query instead of checking it in the Javascript code.

We do this by using a condition in Mongoose:
```javascript
Stock.updateOne(
    { product: product, store: store, quantity: { $gte: qtyNum } },
    { $inc: { quantity: -qtyNum } }
)
```
In this query, `quantity: { $gte: qtyNum }` means we only update the document if the store has enough stock. If two admins try to take the last item at the same time, only one query will succeed (updatedCount will be 1). The other query will find 0 items matching the criteria and will do nothing (updatedCount will be 0), returning a "not enough stock" error. This prevents negative stock.

## Simple Transfers (All-or-Nothing)

When we move stock from Store A to Store B:
1. We first subtract the stock from Store A.
2. If this works, we then add the stock to Store B.
3. If adding to Store B fails for any reason (like a database error), we quickly add the stock back to Store A inside a catch block.

This simple rollback check ensures that we do not lose stock in case of a crash or database error.
