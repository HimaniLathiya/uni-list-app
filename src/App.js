import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { LOGIN } from './constants/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./css/main.css";
import "./css/util.css";
import "./css/developer.css";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <div className="limiter">
          <div className="container-login100">
              <Switch>          
                <Route exact path="/" component={Dashboard} />
                <Route exact path={LOGIN} component={Login} />
                <Route component={NotFound} />
              </Switch>
              </div>
          </div>
        </div>
      </Router>
  );
};
export default App;
