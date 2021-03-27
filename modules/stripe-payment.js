const Stripe = require('stripe');
const stripe = Stripe('sk_test_51IZ0xrF5TwdgwJJVHDhEdeYiAzao6mHV1UXbpUUvpc47vLGVXV5VLIL13nCIly3ulDdFLZqlvvpWHGWhAoZGsfod00vi2Y9PzL');

const customer = await stripe.customers.create({
  description: 'My First Test Customer (created for API docs)',
});

module.exports = {
  createCustomer(){


  }


}