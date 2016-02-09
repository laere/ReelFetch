import react from 'react'
import ReactRouter from 'react-router'
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var CreateHistory = require('history/lib/createHashHistory');

var History = new CreateHistory({
  queryKey: false
});

//BASE FOR PAGES?
var HomePage = require('./containers/HomePage.js');
//require profile page
//require movie display page

var Routes = (
  <Router history={History} >
    {/*Where the routes live (Home base)*/}
      <Route pather='/' component={HomePage} >
          {/*Routes we access from the home page(profile, movie views, otehr user profiles etc)*/}
          <Route />
          <Route />
      </Route>
  </Router>
);

module.exports = Routes;
