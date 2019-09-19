import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
import Navbar from './components/navbar/navbar.component.jsx';

import './App.scss';

function App() {
  return (
    <div>
        <Navbar/>
        <div className="container wrapper">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/shop" component={ShopPage}></Route>
            <Route exact path="/login" component={LoginPage}></Route>
            <Route component={NotFound}/>
          </Switch>
        </div>
    </div>
  );
}

export default App;
