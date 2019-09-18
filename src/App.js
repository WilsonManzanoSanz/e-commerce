import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import NotFound from './pages/notfound/notfound.component';

import './App.scss';

function App() {
  return (
    <div className="container wrapper">
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/shop" component={ShopPage}></Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
