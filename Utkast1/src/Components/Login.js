import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../widgets';

export class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="mainView-signin">
          <form className="form-signin">
            <h1>Vennligst logg inn</h1>
            <input type="email" className="form-control" placeholder="Ansattnummer" required />
            <input type="password" className="form-control" placeholder="Passord" />
            <button className="btn btn-lg btn-primary btn-block" id="inputPassword" type="submit">
              Logg inn
            </button>
          </form>
        </div>
      </div>
    );
  }
}
