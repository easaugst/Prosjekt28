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

export class KundeReg extends Component {
  kundenr = '';
  fdag = '';
  fnavn = '';
  enavn = '';
  epost = '';
  tlf = '';

  render() {
    return (
      <div className="mainView">
      <ValidatorForm
            ref="form"
            onSubmit ={this.add}
        >
        <h3>Legg til kunde</h3>
        <Card title="Kundeinformasjon">
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

          <Form.Label>Tlf:</Form.Label>
          <TextValidator
              onChange={event => (this.tlf = event.target.value)}
              placeholder="22446688"
              value={this.tlf}
              validators={['required', 'isNumber']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig telefonnummer']}
              className="form-control"
          />

          <Form.Label>Epost:</Form.Label>
          <TextValidator
              onChange={event => (this.epost = event.target.value)}
              placeholder="Ola@Nordmann.no"
              value={this.epost}
              validators={['required', 'isEmail']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig epostadresse']}
              className="form-control"
          />

          <Form.Label>Fødselsdag:</Form.Label>
          <TextValidator
              onChange={event => (this.fdag = event.target.value)}
              placeholder="Ola@Nordmann.no"
              value={this.fdag}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig dato']}
              className="form-control"
              type="date"
          />
        </Card>
        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success2>
              Registrer kunde
            </Button.Success2>
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
    kundeService.addKunde(this.fnavn, this.enavn, this.tlf, this.epost, this.fdag, this.props.match.params.id, () => {
      history.push('/oversikt/kunde');
    });
    kundeService.newDate(() => {});
  }

  cancel() {
    history.push('/registrering/');
  }
}
