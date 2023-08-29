# Inventory Management REST API using Cloudflare Workers and Fauna

This project is a RESTful API built using Cloudflare Workers and Fauna. It manages a simple inventory with basic CRUD (Create, Read, Update, Delete) operations.

This code is part of a tutorial on [Youtube](https://www.youtube.com/watch?v=fse_UTAki6w&ab_channel=FaunaInc.).

## Prerequisites
- A Fauna account
- Cloudflare account
- Node 18 installed

## Getting Started
Follow these steps to get the Inventory Management REST API up and running:

1. Clone this repository
2. Install dependencies: `npm install`
3. In your `wrangler.toml` file in the root directory add the following environment variables:
		- `FAUNA_SECRET`: Your Fauna secret key
4. Deploy the project: `npm run deploy`


## Test Your API
You can use tools like Postman or CURL to test the API:

### Create an Item

```
curl -X POST https://your-worker-url.xyz/ -H "Content-Type: application/json" -d '{"item": "Apple", "quantity": 10, "price": 2}'
```

### Get All Items

```
curl -X GET "https://your-worker-url.xyz/"
```

### Get an Item

```
curl -X GET "https://your-worker-url.xyz/?id=<some-id>"
```

### Update an Item

```
curl -X PUT "https://your-worker-url.xyz/?id=<ID>" -H "Content-Type: application/json" -d '{"item": "Updated Apple", "quantity": 20, "price": 3}'
```

### Delete an Item

```
curl -X DELETE "https://your-worker-url.xyz/?id=<ID>"
```
