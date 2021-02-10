// Require express
const express = require('express');

// Define PORT
const PORT = process.env.PORT || 8080;

const app = express();

// Middleware for handling the JSON and for static content from public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set handlebars
const exphbs = require('express-handlebars');
const router = require('./controllers/burgers_controller.js');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controllers/burgers_controller.js');

app.use(routes);

app.listen(PORT, () =>
    console.log(`Server listening on: http://localhost:${PORT}`)
);