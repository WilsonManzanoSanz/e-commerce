import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { getUser } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
import CheckoutPage from './pages/checkout/checkout.component';
import GoogleLoginPage from './pages/google/google.component';
import AdminPage from './pages/admin/admin.component';
import ProfilePage from './pages/profile/profile.component';
import Categories from './pages/catogories/categories';

import PrivateRoute from './components/private-route/private-route.component';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.queryClient = new QueryClient();
  }

  componentDidMount() {
    const { getUser, currentUser } = this.props;
    if (currentUser && currentUser.id) {
      getUser(currentUser.id);
    }
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={this.queryClient}>
            <Navbar />
            <div className="container wrapper">
              <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/shop" component={ShopPage}></Route>
                <Route path="/google/:token" component={GoogleLoginPage}></Route>
                <Route exact path="/checkout" component={CheckoutPage}></Route>
                <Route exact path="/profile" component={ProfilePage}></Route>
                <PrivateRoute loggedIn={this.props.currentUser && (this.props.currentUser.userType === 2)} component={AdminPage} path="/admin/products" />
                <PrivateRoute loggedIn={this.props.currentUser && (this.props.currentUser.userType === 2)} component={Categories} path="/admin/categories" />
                <Route exact path="/login" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<LoginPage />)}></Route>
                <Route component={NotFound} />
              </Switch>
            </div>
          </QueryClientProvider>
        </PersistGate>
      </BrowserRouter>
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
