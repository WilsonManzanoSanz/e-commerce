import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import NotFound from './pages/notfound/notfound.component';
import Navbar from './components/navbar/navbar.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: null
    };

    this.unSubscription = null;
  }

  componentDidMount(){
    this.unSubscription = auth.onAuthStateChanged(async (user) => {
      if(user){
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: snapshot.data()
          })
        })
      } else {
        this.setState({
          currentUser: user
        });
      }
    });
  }

  componentWillUnmount(){
    this.unSubscription();
  }

  render (){
    return (
      <div>
        <Navbar currentUser={this.state.currentUser}/>
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
}

export default App;
