'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */
require('dotenv').config()
// require('dotenv').config({ path: require('find-config')('.env') })

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = {
    create: async(ctx) => {
    const {address, amount, productItems, zipcode, token, city} = ctx.request.body
    //create charges in stripe
    const charge = await stripe.charges.create({
        amount: Math.floor(amount * 1000 / 10),
        currency: 'usd',
        description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
        source: token
    })
    //create order in database
    const order = await strapi.api.orders.services.orders.create({
        user: ctx.state.user._id, 
        address,
        amount, 
        productItems,
        zipcode,
        city
    })

    return order
    }

};
