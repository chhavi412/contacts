Basic info:
backend server for contacts
1) coded using sequelize
2) data tables: users and contacts
2) routes: login, home, contacts

steps to run backend:

# install dependencies
step1: npm install

step2: create database in pgadmin named contacts
step3: change database credentials in sequelize.js
step4: comment out the lines mentioned in sequelize.js to avoid recreation of tables

# to run
nodemon index.js
