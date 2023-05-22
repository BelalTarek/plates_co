Start project by run 
- npm install
- run your mongodb server
- yarn start:dev // for watching mode

---- You will find all API's you need to create new Product, new Offer and new Basket ----

Here's Some Example JSON Requests

createProduct => POST /products
{
  "name": "red_plate";
  "price": 50;
  "product_code": "R01";
}

--------------------------------------------------

createOffer => POST /Offers
{
  "offer_type": "buy-one-get-one-half-price",
  "discount_rate": 50,
  "product_code": "R01"
}

And you can create Basket just by calling POST /basket

# Steps-To-Test

- Create Products => Then => Create offers => Then => Create Basket.

- Start Adding your Products to busket you created Using The basket id you created

- when you are done adding products call GET /basket/:id/total Route to calculate the total price of the basket
