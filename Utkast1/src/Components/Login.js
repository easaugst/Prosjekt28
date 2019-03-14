import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../widgets';
import { ansattService } from '../Services/Ansatt';
const history = createHashHistory();

export class Login extends Component {
  verification = 0;
  ansatt = '';
  email = '';
  pwd = '';
  render() {
    return (
      <div className="mainView-signin">
        <form className="form-signin">
          <h1>Vennligst logg inn</h1>
          <input
            type="email"
            className="form-control"
            value={this.email}
            placeholder="E-post adresse"
            onChange={event => (this.email = event.target.value)}
          />
          <input
            type="password"
            className="form-control"
            value={this.pwd}
            placeholder="Passord"
            onChange={event => (this.pwd = event.target.value)}
          />
          <button className="btn btn-lg btn-primary btn-block" id="inputPassword" type="submit" onClick={this.signIn}>
            Logg inn
          </button>
        </form>
      </div>
    );
  }

  signIn() {
    ansattService.ansattSignin(this.email, this.pwd, resultat => {
      this.verification = JSON.parse(resultat).length;
      console.log('verification: ' + this.verification);
      this.ansatt = JSON.parse(resultat);
      if (this.verification == 1) {
        this.email = '';
        this.pwd = '';
        this.ansatt.map(ansatt => {
          window.ansatt = ansatt.ansattnr;
        });
        history.push('/oversikt');
      } else if (this.verification == 0) {
        this.email = '';
        this.pwd = '';
      }
      console.log(window.ansatt);
    });
  }
}
