<h1 align="center">💻 Travel Wishlist</h1>

<div align="center">

[![](https://img.shields.io/badge/Made_with-Nodejs-green?style=for-the-badge&logo=node.js)](https://nodejs.org/en/)

</div>
🌴✈️ For this exercise, we will build a simple application where we will store a list of countries you wish to go to!

You should use an array of objects to store your countries in the country list.

ISO Alpha 2 and Alpha 3 codes [can be found here](https://www.iban.com/country-codes). They are standard codes assigned to identify a country.

Our application should have the following routes:

Note: bonuses are optional. You should only try them out if you can finish the “normal” routes 🙂

## 1. GET /api/countries

This should respond with a list of countries in your list. You should start off with 5 countries.

### BONUS:

add support for a query string that would return all countries sorted alphabetically; something like ?sort=true (hint: true will be passed as “true” – string type – in your query string)

## 2. POST /api/countries

This route should accept JSON data and add the new country received to the list of countries (eg: add an object inside the countries array).

### BONUS:

Do not accept the country if it already exists in the list; check both the alpha 2 code and the alpha 3 code for a match.

### BONUS 2:

Validate the data you receive (You can use express-validator, which is based on validator.js) before adding it !

## 3. GET /api/countries/:code

This route should return a single country, based on the code provided. You should accept both an alpha 2 or an alpha 3 code.

### BONUS:

handle the situation where the country does not exist in your list

## 4. PUT /api/countries/:code

This route should accept edits to an existing country in the list (eg: edit an object inside the countries array).

### BONUS:

Check if the country is in your list before allowing edition.

### BONUS 2:

Validate the data you receive before updating the country. Can you make it so that you use the same validation logic that for the POST route, without duplicating your code?

## 5. DELETE /api/countries/:code

This route should allow you to delete a specific country from the list (eg: remove an object from the array)

### BONUS:

you’ve changed your mind; what if you segmented your countries into two categories? One that would be “already visited” and the other which would be “to visit”?

In that case hitting the delete endpoint would just change that specific flag in your country object instead of completely removing it from the array.

To achieve this properly; you will also need to:
– Edit your country objects to add a visited boolean flag
– Update your validation logic to take this into account for the POST and PUT routes
– Edit the get all countries routes so that you can pass a visited=true query string, on top of the sorting one, to filter and return countries by their status

## 6. Add routing

Move all your request handlers to a specific router. For example, all requests made to /api/countries should be processed into a dedicated router like wishlistRouter.js

### 🌟 SUPER EXTRA BONUS STEP 🌟

Do only if you have completed all previous steps + associated bonuses

## 7. Add a views engine

Use a templating engine (like [EJS](https://ejs.co/) – Embedded JavaScript templates) to add views to your application. A template engine ([hint](https://expressjs.com/en/guide/using-template-engines.html)) enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client!

Try and follow the [official documentation](https://www.npmjs.com/package/ejs) and [this guide](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application) to achieve this step!

Display the list of countries in the wishlist
Add a form to be able to add a new country in the list
