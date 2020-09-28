import React, { Suspense } from 'react';
import Auth from './hoc/auth';
import { Route, Switch } from "react-router-dom";
//Pages
import AboutPage from './components/views/AboutPage';
import AddProductPage from './components/views/AddProductPage';
import ContactPage from './components/views/ContactPage';
import DetailProductPage from './components/views/DetailProductPage';
import Footer from './components/views/Footer';
import HomePage from './components/views/HomePage';
import LoginPage from './components/views/LoginPage';
import NavBar from './components/views/NavBar';
import PropertiesPage from './components/views/PropertiesPage';
import RegisterPage from './components/views/RegisterPage';
import ToBuyPage from './components/views/ToBuyPage';
import ToRentPage from './components/views/ToRentPage';
import ManageProducts from './components/views/ManageProducts'; 



function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar/>
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/properties" component={Auth(PropertiesPage, null)} />  
          <Route exact path="/rent" component={Auth(ToRentPage, null)} />
          <Route exact path="/buy" component={Auth(ToBuyPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/add" component={Auth(AddProductPage, true)} />
          <Route exact path="/manage" component={Auth(ManageProducts, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/about" component={Auth(AboutPage, null)} />
          <Route exact path="/contact" component={Auth(ContactPage, null)} />
          </Switch>
      </div>
      <Footer/>
    </Suspense>
  );
}

export default App;
