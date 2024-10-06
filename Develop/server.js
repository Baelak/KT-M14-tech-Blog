// server.js
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

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET || 'tech_blog_key',
  cookie: {
    maxAge: 60 * 60 * 1000,  // 1 hour
    httpOnly: true,          // Prevent client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
    sameSite: 'strict',      // Prevents CSRF attacks
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,  // Clean up expired sessions every 15 minutes
    expiration: 24 * 60 * 60 * 1000,          // Session expires after 24 hours
  }),
};

// Apply session middleware
app.use(session(sess));

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handling
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An unexpected error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Sync Sequelize and start the server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`💚 Now listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
