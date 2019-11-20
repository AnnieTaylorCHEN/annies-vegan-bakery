# Annie's Vegan Bakery

## Backend
- CMS - Strapi, an open source CMS + graphql
- Database - MongoDB Atlas cloud service
- Payment - Stripe 
- Email - SendGrid

## Front-end
- React 
- UI library - gestalt 
- Payment - Stripe elements

## How to run 
In this project folder, you need to run `npm start` 
then cd to server folder, run `strapi start` provided you already installed strapi cli. 

## Summary of project
This project has 3 categories : cookies, cakes, bread, which are accessed on the home page. When clicked, customer can choose specific items from each category, and add to their cart. The cart is persisted on the local storage, and only registered customer can save items in their cart and process the order. After ordering is successful, customer will get an email as confirmation, sent to the email they wrote in the shipping information. 

Further improvement: the gestalt library makes a relatively quick  development, however the the look isn't ideal and styling is very restrictive. In bigger project I would like to write my own components and style them to my liking. The design of UX is also not very ideal, it's functional but not very smooth enough. I would improve that through re-design. Currently the email is very simple, and there is no connection for stripe payment and strapi backend yet, so from the backend we don't know if the orders have been successfully paid. In real life project, this issue must be explored further, and email sent to customer also needs to be customized so they see a confirmation of their orders as well, instead of the current general message. 
