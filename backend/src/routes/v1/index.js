const express = require('express');
const authRoute = require('./auth.route');
const dashboardRoute = require('./dashboard.route');
const userRoute = require('./user.route');
const educationRoute = require('./education.route');
const productRoute = require('./product.route');
const cartRoute = require('./cart.route');
const transactionRoute = require('./transaction.route');
const reviewRoute = require('./review.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/educations',
    route: educationRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/carts',
    route: cartRoute,
  },
  {
    path: '/transactions',
    route: transactionRoute,
  },
  {
    path: '/reviews',
    route: reviewRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
