require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "name",
           "price",
           "image",
           "shortDescription",
           "productId"
      from "products";
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sqlInput = `
  select *
  from "products" 
  where "productId" = $1
  `;
  const params = [productId];
  db.query(sqlInput, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({
          error: `Cannot find product with "productId" ${productId}`
        });
      } else {
        res.json(product);
      }
    });
});
// cart get
app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
    return;
  }
  const sql = `
  select "c"."cartItemId",
  "c"."price",
  "p"."productId",
  "p"."image",
  "p"."name",
  "p"."shortDescription"
from "cartItems" as "c"
join "products" as "p" using ("productId")
where "c"."cartId" = $1
  `;
  const params = [req.session.cartId];
  db.query(sql, params)
    .then(result => {
      const cart = result.rows;
      res.json(cart);
    })
    .catch(err => next(err));
});

// cart post
app.post('/api/cart', (req, res, next) => {

  const productId = Number(req.body.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sqlPrice = `
  select "price"
  from "products"
  where "productId" = $1
  `;
  const params = [productId];

  return db.query(sqlPrice, params)
    .then(priceResult => {
      if (priceResult.rows.length === 0) {
        next(new ClientError(` Product # ${productId} does not exist in our records`, 400));
      }
      if (req.session.cartId) {
        const cartIdAndPrice = {
          cartId: req.session.cartId,
          price: priceResult.rows[0].price
        };
        return cartIdAndPrice;
      }
      const insertCartSql = ` 
      insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"
      `;
      return db.query(insertCartSql)
        .then(cartIdResult => {
          const priceAndCartId = {
            cartId: cartIdResult.rows[0].cartId,
            price: priceResult.rows[0].price
          };
          return priceAndCartId;

        });

    })
    .then(dataResult => {
      req.session.cartId = dataResult.cartId;
      const insertRowSQL = ` 
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
          `;
      const params = [dataResult.cartId, dataResult.price, productId];
      return db.query(insertRowSQL, params)
        .then(insertResult => {
          return insertResult.rows[0].cartItemId;
        });
    })
    .then(cartItemRes => {
      const cartItem = ` 
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
where "c"."cartItemId" = $1
      `;
      const params = [cartItemRes];
      db.query(cartItem, params)
        .then(data => {
          res.status(201).json(data.rows[0]);
        });
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
