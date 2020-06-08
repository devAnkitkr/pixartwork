import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, getUserProfileDoc } from "./firebase/firebase";
import HomePage from "./pages/home/home.page";
import Navbar from "./components/navbar/navbar.components";
import LoginPage from "./pages/login/login.page";
import JoinPage from "./pages/join/join.page";
import SubmitPhotoPage from "./pages/submit-photo/submit-photo.page";
import CollectionPage from "./pages/collection/collection.pages";
import AccountPage from "./pages/account/account.page";
import SearchPage from './pages/search/search.page'
import Footer from './components/footer/footer.component'
import userAction from "./redux/user/user.action";

import "./App.css";

const App = ({ currentUser,setCurrentUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        getUserProfileDoc(user.uid).then((userRef) => {
          if (userRef) {
            const { name, email, createdAt, profilePic,bio } = userRef;
            setCurrentUser({
              uid,
              name,
              email,
              createdAt,
              profilePic,
              bio
            });
          }
        });
      }
    });
  }, [setCurrentUser]);

  return (
    <div className="App">
      <Navbar />
      <main className='main-content'>
      <Switch>
        <Route path="/submitphoto" render={() => currentUser === null ? <Redirect to='/login' /> : <SubmitPhotoPage />} />
        <Route path="/profile/:uid" render={() => <CollectionPage />} />
        <Route path="/login" render={() => currentUser !== null ? <Redirect to ='/' /> : <LoginPage />} />
        <Route path="/join" render={() => currentUser !== null ? <Redirect to ='/' /> : <JoinPage />} />
        <Route path ="/account" render ={()=> currentUser === null ? <Redirect to ='/login' /> : <AccountPage />} /> 
        <Route path="/search/:searchId" render={() => <SearchPage />} />    
        <Route path="/" component={HomePage} />
      </Switch>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = state=>({
  currentUser : state.user.currentUser
})
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(userAction(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
