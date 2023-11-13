/********************************************************************************

* WEB322 – Assignment 04

*

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

*

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

*

* Name: Gyeongrok oh Student ID: 119140226 Date:Nov 13 2023

*

* Published URL: https://gyeongrok-oh.github.io/WEB-322/

*

********************************************************************************/
const express = require('express');
const legoData = require('./modules/legoSets');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080; // Set the port for your server


app.set('view engine', 'ejs'); //A4

// Middleware to wait for legoData initialization before starting the server
app.use(async (req, res, next) => {
  try {
    await legoData.initialize();
    next(); // Proceed to the next middleware/route
  } catch (error) {
    res.status(500).send('Error initializing Lego data');
  }
});

app.use(express.static(__dirname + '/public'));
 
// Update route for homepage

app.get('/', (req, res) => {
  res.render('home'); 
});


app.get('/about', (req, res) => {
  res.render('about');
});

// app.get('/viewData', function (req, res) {
//   let someData = [
//     {
//       name: 'John',
//       age: 23,
//       occupation: 'developer',
//       company: 'Scotiabank',
//     },
//     {
//       name: 'Sarah',
//       age: 32,
//       occupation: 'manager',
//       company: 'TD',
//     },
//   ];

//   res.render('viewData', {
//     data: someData,
//   });
// }); // A4

app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme; // query parameter

  if (theme) {
    legoData.getSetsByTheme(theme)
      .then(sets => {
        if (sets.length > 0) {
          res.render('sets', { sets: sets }); // Render the 'sets' view with data
        } else {
          res.status(404).render("404", { message: "No sets found with the specified theme" });
        }
      })
      .catch(error => {
        res.status(500).render("404", { message: "Error fetching sets by theme" });
      });
  } else {
    legoData.getAllSets()
      .then(sets => {
        if (sets.length > 0) {
          res.render('sets', { sets: sets }); // Render the 'sets' view with data
        } else {
          res.status(404).render("404", { message: "Sets not available" });
        }
      })
      .catch(error => {
        res.status(500).render("404", { message: "Error fetching all sets" });
      });
  }
});





app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;

  legoData.getSetByNum(setNum)
    .then(set => {
      if (set) {
        res.render('set', { set: set });
      } else {
        res.status(404).render('404', { message: 'Set not found' });
      }
    })
    .catch(error => {
      res.status(500).render('404', { message: 'Error fetching the LEGO set' });
    });
});



// // Add support for a custom "404 error".

app.use((req, res) => {
  res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
