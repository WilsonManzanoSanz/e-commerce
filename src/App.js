import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
import Navbar from './components/navbar/navbar.component.jsx';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser} from './redux/user/user.selector';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);

    this.unSubscription = null;
  }

  componentDidMount(){
    this.unSubscription = auth.onAuthStateChanged(async (user) => {
      if(user){
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser(snapshot.data());
        })
      } else {
        this.props.setCurrentUser(user);
      }
    });
  }

  componentWillUnmount(){
    this.unSubscription();
  }

  render (){
    return (
      <div>
        <Navbar />
        <div className="container wrapper">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/shop" component={ShopPage}></Route>
            <Route exact path="/login" render={() => this.props.currentUser ? (<Redirect  to="/"/>) : (<LoginPage />)}></Route>
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
