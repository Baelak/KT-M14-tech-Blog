const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the templating engine with helpers
const hbs = exphbs.create({ helpers });

// Configure session with Sequelize store
const sess = {
  secret: process.env.SESSION_SECRET || 'tech_blog_key', // Secret should be defined in .env
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,         // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // true if HTTPS in production
    sameSite: 'strict',     // Helps prevent CSRF attacks
  },
  resave: false, // Prevent session from being saved repeatedly if unmodified
  saveUninitialized: true, // Saves uninitialized sessions
  store: new SequelizeStore({
    db: sequelize,         // Link to the Sequelize instance
    checkExpirationInterval: 15 * 60 * 1000, // Interval for cleaning expired sessions (15 minutes)
    expiration: 24 * 60 * 60 * 1000 // Session expires after 1 day
  }),
};

// Apply session middleware
app.use(session(sess));

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing request body and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes
app.use(routes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }) // `force: false` ensures no data loss
  .then(() => {
    app.listen(PORT, () => console.log(`💚 Server is running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err); // Error handling for database connection
  });
