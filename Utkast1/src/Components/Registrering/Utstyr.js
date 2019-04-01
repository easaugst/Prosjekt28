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

export class UtstyrReg extends Component {
  utstyrstypeid = 0;
  ustatus = '';
  ubefinnelse = '';
  utsutleienavn = '';

  render() {
    return (
      <div className="mainView">
      <ValidatorForm
            ref="form"
            onSubmit ={this.add}
        >
        <h3>Legg til utstyr</h3>
        <Card title="Utstyrsinformasjon">
          <Form.Label>Utstyrstype:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.utstyrstypeid = event.target.value)}>
            <option value="4">Velg type her</option>
            <option value="4">Hjelm</option>
            <option value="5">Lappesett</option>
            <option value="6">Sykkelveske</option>
            <option value="7">Barnesete</option>
            <option value="8">Barnehenger</option>
            <option value="9">Lastehenger</option>
            <option value="10">Beskytter</option>
            <option value="11">Lås</option>
          </select>

          <Form.Label>Utstyrstatus:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.ustatus = event.target.value)}>
            <option value="Lager">Velg status</option>
            <option value="Lager">Lager</option>
            <option value="Utleid">Utleid</option>
            <option value="Service">Service</option>
            <option value="Stjålet">Stjålet</option>
          </select>
          <Form.Label>Befinnelse:</Form.Label>
          <TextValidator
              onChange={event => (this.ubefinnelse = event.target.value)}
              name="email"
              value={this.ubefinnelse}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig befinnelse']}
              className="form-control"
          />

          <Form.Label>Tilhører utleiested:</Form.Label>
          <TextValidator
              onChange={event => (this.utsutleienavn = event.target.value)}
              name="email"
              value={this.utsutleienavn}
              validators={['required', 'required']}
              errorMessages={['Dette feltet kan ikke stå tomt', 'ikke gyldig utleiested']}
              className="form-control"
          />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success2>Registrer utstyr</Button.Success2>
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
    console.log(this.utstyrstypeid, this.ustatus, this.ubefinnelse, this.utsutleienavn);
    utstyrService.addUtstyr(this.utstyrstypeid, this.ustatus, this.ubefinnelse, this.utsutleienavn, () => {
      history.push('/oversikt/utstyr');
    });
  }

  cancel() {
    history.push('/registrering/');
  }
}
