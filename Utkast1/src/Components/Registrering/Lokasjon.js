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
import { lokasjonService } from '../../Services/Lokasjon';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table, TextValidator } from '../../widgets';
const history = createHashHistory();

export class LokasjonReg extends Component {
  fdag = '';
  utleienavn = '';
  adresse = '';
  postnr = '';
  poststed = '';

  render() {
    return (
      <div className="mainView">
      <ValidatorForm
            ref="form"
            onSubmit ={this.add}
        >
        <h3>Legg til Lokasjon</h3>
        <Card title="Lokasjonsinformasjon">
          <Form.Label>Utleienavn</Form.Label>
          <TextValidator
              onChange={event => (this.utleienavn = event.target.value)}
              placeholder="Rallarvegen"
              value={this.utleienavn}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />

          <Form.Label>Adresse</Form.Label>
          <TextValidator
              onChange={event => (this.adresse = event.target.value)}
              placeholder="Rallarvegen 20a"
              value={this.adresse}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig utleienavn']}
              className="form-control"
          />

          <Form.Label>Postnr:</Form.Label>
          <TextValidator
              onChange={event => (this.postnr = event.target.value)}
              placeholder="7790"
              value={this.postnr}
              validators={['required', 'isNumber']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig telefonnummer']}
              className="form-control"
          />

          <Form.Label>Poststed</Form.Label>
          <TextValidator
              onChange={event => (this.poststed = event.target.value)}
              placeholder="Malm"
              value={this.poststed}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke gyldig poststed']}
              className="form-control"
          />
        </Card>
        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success2>
              Registrer lokasjon
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
    lokasjonService.addLokasjon(this.utleienavn, this.adresse, this.postnr, this.poststed, () => {
      history.push('/oversikt/lokasjon');
    });
    lokasjonService.newDate(() => {});
  }

  cancel() {
    history.push('/registrering/');
  }
}
