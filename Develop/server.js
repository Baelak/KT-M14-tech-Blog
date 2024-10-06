const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the templating engine
const hbs = exphbs.create({ helpers });

// Set up session
const sess = {
  secret: process.env.SESSION_SECRET || 'tech_blog_key', // Ensure you have a session secret in your .env
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,          // Prevent client-side JavaScript from accessing the cookie
    secure: false,          // Set to true if using HTTPS
    sameSite: 'strict'      // Prevents CSRF attacks
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(routes);

// Sync Sequelize and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`💚 Now listening on ${PORT}`));
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
