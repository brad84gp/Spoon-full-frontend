
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import './App.css';


import Navbar from './NavLinks/NavBar';

import HomePage from './Home/Homepage';
import RecipePage from './Recipes/recipePage';
import MenuPage from './Menu/menu';
import IngredientPage from './Ingredients/ingredients';
import ProductPage from './Products/productPage';
import LoginForm from './Authentication/login';
import RegisterForm from './Authentication/register';
import UserProfile from './User/userProfile';
import LiveFeed from './LIveFeed/liveFeed';
import EditProfile from './User/UserEditProfile';





function App() {


  const storeValues = useSelector(store=>store)

  console.log(storeValues)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/Recipes">
              <RecipePage />
            </Route>

            <Route exact path="/Menu">
              <MenuPage />
            </Route>

            <Route exact path="/Ingredients">
              <IngredientPage />
            </Route>

            <Route exact path="/Products">
              <ProductPage />
            </Route>
            
            <Route exact path="/Login">
              <LoginForm />
            </Route>

            <Route exact path="/Register">
              <RegisterForm />
            </Route>

            <Route exact path="/Profile">
              <UserProfile />
            </Route>

            <Route exact path="/LiveFeed">
              <LiveFeed />
            </Route>

            <Route exact path="/Edit">
              <EditProfile />
            </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
