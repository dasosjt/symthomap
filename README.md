# SYMPTOMAPP

## How to use it?
  This angular + node app consist in representating the use case
  for meds and epidemiologist for controlling health issues propagation.

  In this app there are 3 user types:
    1. Admin
    2. Meds
    3. Epidemiologist

  Where the admin user is the only one that can create all the different types of user.
  Meds create patients and colocate exactly the GPS location as floating point number. 
  Epidemiologist has a view of all the patients.

  For testing reason I have created testing users.
    1. admin@test.com - admin
    2. med@test.com - med
    3. epidem@test.com - epidem

  If you want to create a new user from scratch, check the private route /signup

## Localhost
  npm install
  node server.js

  chrome or firefox: localhost:8080

## Heroku

https://symptomapp.herokuapp.com/

## Based on next link
  https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
