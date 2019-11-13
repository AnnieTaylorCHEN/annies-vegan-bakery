import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import "gestalt/dist/gestalt.css";

import App from './components/App';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Products from './components/Products'

import * as serviceWorker from './serviceWorker';

const Root = () => (
    <Router>
        <Fragment>
            <Navbar />
            <Switch>
                <Route component={App} exact path="/" />
                <Route component={Signin} exact path="/signin" />
                <Route component={Signup} exact path="/signup" />
                <Route component={Checkout} exact path="/checkout" />
                <Route component={Products} exact path="/:typeId" />
            </Switch>
        </Fragment>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
