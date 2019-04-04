import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ValidatorForm } from 'react-form-validator-core';

import { sykkelService } from '../../Services/Sykkel';
import { kundeService } from '../../Services/Kunde';
import { utstyrService } from '../../Services/Utstyr';
import { ansattService } from '../../Services/Ansatt';
import { bestillingsService } from '../../Services/Bestilling';
import { utleieService } from '../../Services/Utleie';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table, TextValidator } from '../../widgets';
const history = createHashHistory();

export class AnsattReg extends Component {
  tlfnr = '';
  epost = '';
  fnavn = '';
  enavn = '';
  admin = '';
  utleienavn = '';
  stilling = '';

  render() {
    return (
      <div className="mainView">
      <ValidatorForm
            ref="form"
            onSubmit ={this.add}
        >
        <h3>Legg til ansatt</h3>
        <Card title="Ansattinformasjon">
          <Form.Label>Fornavn:</Form.Label>
          <TextValidator
              onChange={event => (this.fnavn = event.target.value)}
              placeholder="Ola"
              value={this.fnavn}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />

          <Form.Label>Etternavn:</Form.Label>
          <TextValidator
              onChange={event => (this.enavn = event.target.value)}
              placeholder="Nordmann"
              value={this.enavn}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />
          <Form.Label>Tlf. nr.:</Form.Label>
          <TextValidator
              onChange={event => (this.tlfnr = event.target.value)}
              placeholder="22446688"
              value={this.tlfnr}
              validators={['required','maxNumber:99999999']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig telefonnummer']}
              className="form-control"
          />

          <Form.Label>Epost:</Form.Label>
          <TextValidator
              onChange={event => (this.epost = event.target.value)}
              placeholder="ola@nordmann.no"
              value={this.epost}
              validators={['required', 'isEmail']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig epostadresse']}
              className="form-control"
          />

          <Form.Label>Admin:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.admin = event.target.value)}>
            <option>Er vedkommende admin?</option>
            <option value="0">Nei</option>
            <option value="1">Ja</option>
          </select>

          <Form.Label>Utleiested:</Form.Label>
          <TextValidator
              onChange={event => (this.utleienavn = event.target.value)}
              name="email"
              placeholder="Otta"
              value={this.utleienavn}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />

          <Form.Label>Stilling:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.stilling = event.target.value)}>
            <option>Vedkommendes stilling</option>
            <option value="Daglig leder">Daglig leder</option>
            <option value="Sektretær">Sektretær</option>
            <option value="Selger">Selger</option>
            <option value="Lagerarbeider">Lagerarbeider</option>
          </select>
        </Card>

        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success2>Registrer ansatt</Button.Success2>
          </span>
          <span className="tilbakeMeny">
            <Button.Primary onClick={this.cancel}>Avbryt registrering</Button.Primary>
          </span>
        </div>
        </ValidatorForm>
      </div>
    );
  }

  add() {
    if(this.admin == "" ||  this.stilling == "") {
      alert("Du må fylle inn skjemaet riktig");
    }
    else{
    if(window.admin == true) {
    ansattService.addAnsatt(
      this.tlfnr,
      this.epost,
      this.fnavn,
      this.enavn,
      this.admin,
      this.utleienavn,
      this.stilling,
      this.props.match.params.id,
      () => {
        history.push('/oversikt/ansatt');
      }
    );
  }
  else {
    alert("Du må ha administratortilgang for å legge til ansatte");
    }
  }
}


  cancel() {
    history.push('/registrering/');
  }
}
