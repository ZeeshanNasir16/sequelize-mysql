const express = require('express');
const _ = require('dotenv').config();
const app = express();
const PostModel = require('./model/post');

/**
 * Define the port number that the express application should use.
 */
const port = process.env.port || 5000;

/**
 * Import the database connection file.
 */
const db = require('./config/dbConfig');
const postRouter = require('./router/post');

const initApp = async () => {
  // ^ Middlewares for express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  console.log('Testing the database connection..');
  /**
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');

    //  Syncronize the Post model.
    // PostModel.sync({
    //   alter: true,
    // });

    // ^ Synchronize the DB Tables according to models
    db.sync();

    // ^ App Routes
    app.use('/api/post', postRouter);

    app.listen(port, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Initialize the application.
initApp();
