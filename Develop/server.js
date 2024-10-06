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
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Add a try/catch block around route handling to capture and log errors
try {
  app.use(routes);
} catch (err) {
  console.error('Error while handling routes:', err);
}

// Sync Sequelize and start server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`💚 Now listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
