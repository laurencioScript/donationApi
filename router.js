const { Router } = require('express')
const routes = Router();

const user = require('./src/user.api');
const category = require('./src/category.api');
const donation = require('./src/donation.api');

const root = Router();
root.get("/ping", async (req, res) => {res.status(200).send({ message: 'pong' });})

routes.use(root);
routes.use('/user', user);
routes.use('/category', category);
routes.use('/donation', donation);


module.exports = routes;