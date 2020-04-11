import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component.jsx';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { getUser } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser} from './redux/user/user.selector';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
import CheckoutPage from './pages/checkout/checkout.component';
import GoogleLoginPage from './pages/google/google.component';
import AdminPage from './pages/admin/admin.component';
import ProfilePage from './pages/profile/profile.component';
import ProductsPage from './pages/products/products-page.component';
import ProductPage from './pages/product/product.component';
import ShippingPage from './pages/shipping/shipping.component';
import PrivateRoute from './components/private-route/private-route.component';
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { REDIRECT_URL } from './core/constant';

import './App.scss';

class App extends React.Component {

  componentDidMount(){
    const { getUser, currentUser } = this.props;
    if(currentUser && currentUser.id){
      getUser(currentUser.id);
    } 
  }

  componentWillUnmount(){
  }

  redirectTo(){
    const url = sessionStorage.getItem(REDIRECT_URL);
    if(url){
      sessionStorage.removeItem(REDIRECT_URL);
      return url;
    }
    return '/';
  }

  render (){
    return (
      <div>
        <Navbar />
        <div className="container wrapper first-container">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/shop" component={ShopPage}></Route>
            <Route path="/products" component={ProductsPage}></Route>
            <Route path="/product/:id" component={ProductPage}></Route>
            <Route path="/google/:token" component={GoogleLoginPage}></Route>
            <Route exact path="/checkout" component={CheckoutPage}></Route>
            <Route exact path="/profile" component={ProfilePage}></Route>
            <Route exact path="/shipping" component={ShippingPage}></Route>
            <PrivateRoute loggedIn={this.props.currentUser && (this.props.currentUser.userType === 2)} component={AdminPage} path="/admin"/> 
            <Route exact path="/login" render={() => this.props.currentUser ? (<Redirect  to={this.redirectTo()}/>) : (<LoginPage />)}></Route>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  getUser: id => dispatch(getUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
