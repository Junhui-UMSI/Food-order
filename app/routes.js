/* Example:
[ ] Mongoose, link: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
[ ] Express, link: http://expressjs.com/en/guide/routing.html
[ ] How to query data from mongoose in Express
*/

var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(food); // return all food in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------

    app.get('/about', function(req, res) {
      res.send('This is just a simple about page.');
    });

    app.get('/api/total', function(req, res) {
      // 1. get all data
       var totalprice = 0;

      Food.find(function (err, food) {

          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err) {
              res.send(err);
          }
          for(var i= 0; i< food.length; i++){
            totalprice += food[i].price;
          }
          totalprice = totalprice*(1-0.075);
          console.log(totalprice);
          res.send(totalprice.toString());
      });

      // 2.
      // 3.
      // 4.
    })

    app.get('/api/food', function(req, res) {
        getFood(res);
      // ...
      ///res.send(xxx)
      // res.json(xxx)
      // express => angular
    });
    
    // create food and send back all todos after creation
    app.post('/api/food', function(req, res) {
              console.log("\nCall Food Post method.\n");
              console.log(req);

              // create a todo, information comes from AJAX request from Angular
              Food.create({
                  name: req.body.name,
                  price : req.body.price,
                  done: false
              }, function (err, food) {
                  if (err)
                      res.send(err);

                  // get and return all the todos after you create another
                  getFood(res);
              });
    });


    // delete a food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFood(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
