import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home/home';
import Landing from './Components/Landing/landing';
import Details from './Components/Details/details'
import RecipesCreate from './Components/RecipeCreate/recipeCreate';


function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/createRecipes' component={RecipesCreate}/>
        <Route path='/recipes/:id' component={Details}/> 
        <Route path='/recipes' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;