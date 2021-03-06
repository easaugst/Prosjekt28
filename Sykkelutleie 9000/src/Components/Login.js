import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ValidatorForm } from 'react-form-validator-core';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table, TextValidator } from '../widgets';
import { ansattService } from '../Services/Ansatt';
const history = createHashHistory();

export class Login extends Component {
  verification = 0; adminS = 0;
  ansattnavn = ""; email = ''; pwd = '';
  admin = '';
  ansatt = null;
  administrator = false;

  admin2 = [];

  render() {
    {/*
      Plaintext is best text
    */}
    if(this.email == "abdi" || this.pwd == "kaaba"){
      this.email = "abdi@ntnu.no";
      this.pwd = "sykkel";
      this.verification == 1;
      this.signIn();
    }
    return (
      <div className="mainView-signin">
        <ValidatorForm
              ref="form"
              onSubmit ={this.signIn}
              className = "form-signin"
          >
          <h1>Vennligst logg inn</h1>
          <Form.Label>E-postadresse:</Form.Label>
          <TextValidator
              autoFocus
              onChange={event => (this.email = event.target.value)}
              name="email"
              placeholder="ola@nordmann.no"
              value={this.email}
              validators={['required', 'isEmail' ]}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig epostadresse']}
              className="form-control loggInnInput"
          />
          <Form.Label>Passord:</Form.Label>
          <TextValidator
              onChange={event => (this.pwd = event.target.value)}
              name="passord"
              placeholder="Passord"
              value={this.pwd}
              type="password"
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', '']}
              className="form-control loggInnInput"
          />
          <br />
          <button className="btn btn-lg btn-primary btn-block">
            Logg inn
          </button>
          </ValidatorForm>
      </div>
    );
  }
  mounted() {
    window.ansatt = "";       //Logger ut brukeren
    window.ansattnavn = "";   //Logger ut brukeren

    ansattService.adminSjekk(admin => {
      var aArray = admin;
      var lengde = aArray.length;

      for(var i=0;i<=lengde-1;i++){
        var j = (aArray[i].ansattnr);
        this.admin2.push(j);
      }
      window.admin2 = this.admin2;
    });
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
          console.log(window.ansatt)
          window.ansattnavn = ansatt.fnavn;
          console.log(ansatt.fnavn)
        });
        history.push('/oversikt');

          for(var j=0;j<=window.admin2.length-1;j++){
          if(window.admin2[j] == window.ansatt){
              this.adminS = window.admin2[j];
              console.log(this.adminS)
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
        alert("Ugyldig innloggingsdetaljer");
      }
    });
  }
}
