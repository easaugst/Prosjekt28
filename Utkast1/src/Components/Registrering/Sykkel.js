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

export class SykkelReg extends Component {
  regnr = '';
  sykkeltypeid = '';
  status = '';
  befinnelse = '';
  beskrivelse = '';
  bestilling = '';
  utleienavn = '';

  render() {
    return (
      <div className="mainView">
      <ValidatorForm
            ref="form"
            onSubmit ={this.add}
        >
        <h3>Legg til sykkel</h3>
        <Card title="Sykkelinformasjon">
          <Form.Label>Sykkeltype:</Form.Label>
          <select
            className="form-control"
            value={this.sykkeltypeid}
            onChange={event => (this.sykkeltypeid = event.target.value)}
          >
            <option>Sykkeltype</option>
            <option value="1">Terrengsykkel</option>
            <option value="2">Landeveissykkel</option>
            <option value="3">Tandemsykkel</option>
            <option value="12">Downhillsykkel</option>
            <option value="13">Racersykkel</option>
            <option value="14">Barnesykkel</option>
          </select>

          <Form.Label>Status:</Form.Label>
          <select className="form-control" form="formen" value={this.status} onChange={event => (this.status = event.target.value)}>
          <option value="Lager">Velg status</option>
          <option value="Lager">Lager</option>
          <option value="Utleid">Utleid</option>
          <option value="Service">Service</option>
          <option value="Stjålet">Stjålet</option>
          </select>

          <Form.Label>Befinnelse:</Form.Label>
          <TextValidator
              onChange={event => (this.befinnelse = event.target.value)}
              name="email"
              value={this.befinnelse}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />

          <Form.Label>Beskrivelse:</Form.Label>
          <TextValidator
              onChange={event => (this.beskrivelse = event.target.value)}
              name="email"
              value={this.beskrivelse}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />

          <Form.Label>Tilhører utleiested:</Form.Label>
          <TextValidator
              onChange={event => (this.utleienavn = event.target.value)}
              name="email"
              value={this.utleienavn}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />
        </Card>
        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success2>Registrer sykkel</Button.Success2>
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
    sykkelService.addSykkel(
      this.sykkeltypeid,
      this.status,
      this.befinnelse,
      this.beskrivelse,
      this.utleienavn,
      () => {
        history.push('/oversikt/sykkel');
      }
    );
  }
  cancel() {
    history.push('/registrering/');
  }
}
