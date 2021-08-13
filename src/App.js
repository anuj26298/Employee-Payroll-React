import logo from './logo.svg';
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form.jsx'
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import React from 'react';

class App extends React.Component{
  render(){
    return(
      <div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/payroll-form">
            <PayrollForm/>
          </Route>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
