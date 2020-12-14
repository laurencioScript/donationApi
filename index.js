const cors = require('cors');
const express = require('express');
const routes = require('./router');
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.listen(port, () => console.log(`Server Online, PORT: ${port}`));