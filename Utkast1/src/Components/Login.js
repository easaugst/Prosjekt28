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
  admin = '';
  var = '';
  lengde = 0;
  sjekker = false;
  adminS = 0;
  teller = 0;

  admin2 = [];
  aArray = [];

  administrator = false;

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


          for(var j=0;j<=window.admin2.length-1;j++){
          if(window.admin2[j] == window.ansatt){
              this.adminS = window.admin2[j];
            }
            else {
              
            }
          }

        if(this.adminS == window.ansatt) {
          this.administrator = true;
          window.admin = this.administrator;
          console.log("Administrator med ansattnr " + window.ansatt + " logget inn");
        }
        else {
          this.administrator = false;
          window.admin = this.administrator;
          console.log("Ansattnr " + window.ansatt + " logget inn");
        }

      } else if (this.verification == 0) {
        this.email = '';
        this.pwd = '';
      }
    });
  }
  mounted() {
    ansattService.adminSjekk(admin => {
      this.aArray = admin;
      this.lengde = this.aArray.length;

      for(var i=0;i<=this.lengde-1;i++){
        this.var = (this.aArray[i].ansattnr);
        this.admin2.push(this.var);
      }
      window.admin2 = this.admin2;
    });
  }
}
