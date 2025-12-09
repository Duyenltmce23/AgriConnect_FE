# Review API (Suggested endpoints)

This document describes suggested API endpoints and payloads for implementing server-side reviews and replies for AgriConnect.

Authentication: most endpoints require a Bearer token in `Authorization: Bearer <token>` header. Use role checks on server: `Buyer` for creating reviews, `Farmer` for replying.

1) Create review
- URL: `POST /api/v1/farms/:farmId/products/:productId/reviews`
- Auth: Bearer token (Buyer)
- Body (application/json or multipart for images):
  - `rating` (number, required) - 1..5
  - `text` (string, optional)
  - `image` (file or base64, optional)
- Response 201:
  ```json
  {
    "success": true,
    "data": {
      "id": "review-id",
      "farmId": "",
      "productId": "",
      "userId": "",
      "userName": "",
      "rating": 5,
      "text": "...",
      "imageUrl": "https://...",
      "createdAt": "..."
    }
  }
  ```

Notes: enforce business rules server-side: only one review per product, and a buyer can only have one review per farm.

2) Get reviews for a farm
- URL: `GET /api/v1/farms/:farmId/reviews`
- Auth: optional (Bearer recommended)
- Response 200:
  ```json
  {
    "success": true,
    "data": {
      "stats": { "avg": 4.5, "counts": {"1":0,"2":1,"3":2,"4":3,"5":4} },
      "reviews": [ /* array of review objects */ ]
    }
  }
  ```

3) Get review for a product
- URL: `GET /api/v1/farms/:farmId/products/:productId/review`
- Auth: optional
- Response 200:
  ```json
  {
    "success": true,
    "data": { /* single review object or null */ }
  }
  ```

4) Farmer reply to a review
- URL: `POST /api/v1/farms/:farmId/reviews/:reviewId/reply`
- Auth: Bearer token (Farmer) — must own the farm
- Body:
  - `text` (string)
- Response 200:
  ```json
  {
    "success": true,
    "data": { /* updated review with reply */ }
  }
  ```

5) Data model (example)
- Review:
  ```json
  {
    "id": "",
    "farmId": "",
    "productId": "",
    "userId": "",
    "userName": "",
    "rating": 5,
    "text": "",
    "imageUrl": "",
    "createdAt": "",
    "reply": {
      "farmerId": "",
      "text": "",
      "createdAt": ""
    }
  }
  ```

Server responsibilities:
- Validate rating range and required fields.
- Enforce uniqueness rules: one review per product, one review per buyer per farm.
- Validate that only farm owner (Farmer) may reply and only once.
- Store images securely (e.g., S3) and return `imageUrl`.
