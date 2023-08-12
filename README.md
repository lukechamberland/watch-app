## Final Project

# Introduction

This watch retail platform combines modern convenience with stylish user experience, utilizing fundamental UI principles, state management, and Material-UI for a sleek appearance. The integration of Auth0 provides secure, user-friendly sign-in options. This demonstrates a comprehensive understanding of web development concepts, including the use of Express.js, local APIs, React, and authentication mechanisms.  

## Overview

This project is a modern style web application, which main purpose is to sell and create watches.  The application integrates Javascript, React, Express.js, Auth0 and Material-UI.  It allows users to simply log in through their google account.  The home page displays the main products, and the other pages consist mainly of othe groupings of products, this includes mens, womens, kids and athletics.  

## Key features
Some key features include but are not limited to:

- users are prompted to login through Auth0 login system
- users can favourite and unfavourite products
- users can select quantity to add to cart
- users can view order history

# Getting started  
Breif overview of how to start the application. Before following these instructions, make sure you have Node.js installed.

# Create the database

- In your terminal, begin a new psql session by typing: psql
- Once in psql, create the database by typing: CREATE DATABASE watchdb
- Then, you can exit your psql by typing: \q
- Finally, seed the database by typing: psql -U postgres -d watchdb -f tables.sql
- Lastly, add data to the tables by running:  psql -U postgres -d watchdb -f seeds.sql

# Clone the repository

Clone this repository by simply typing in your terminal: 'git clone git@github.com:lukechamberland/watch-app.git'

Once this is complete you can now cd into the repository by typing: 'cd watch-app'

Once in this repository you can start the back end server by first changing to that directory: 'cd express-back-end' then run 'npm install' to install all necessary dependencies, and lastly 'npm start'.  This will start the back end server.

Now, open a new tab in your terminal in the watch-app directory.  This time, locate your front end directory: 'cd react-front-end'.  Now install all depencies in this directory 'npm install' and start the server 'npm start'.  This will take you to the application. 
