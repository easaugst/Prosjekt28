import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { sykkelService } from '../../Services/Sykkel';
import { kundeService } from '../../Services/Kunde';
import { utstyrService } from '../../Services/Utstyr';
import { ansattService } from '../../Services/Ansatt';
import { bestillingsService } from '../../Services/Bestilling';
import { utleieService } from '../../Services/Utleie';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../../widgets';
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
        <h3>Legg til ansatt</h3>
        <Card title="Ansattinformasjon">
          <Form.Label>Tlf. nr.:</Form.Label>
          <Form.Input type="text" value={this.tlfnr} onChange={event => (this.tlfnr = event.target.value)} />

          <Form.Label>Epost:</Form.Label>
          <Form.Input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />

          <Form.Label>Fornavn:</Form.Label>
          <Form.Input type="text" value={this.fnavn} onChange={event => (this.fnavn = event.target.value)} />

          <Form.Label>Etternavn:</Form.Label>
          <Form.Input type="text" value={this.enavn} onChange={event => (this.enavn = event.target.value)} />

          <Form.Label>Admin:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.admin = event.target.value)}>
            <option>Er vedkommende admin?</option>
            <option value="0">Nei</option>
            <option value="1">Ja</option>
          </select>

          <Form.Label>Utleienavn:</Form.Label>
          <Form.Input type="text" value={this.utleienavn} onChange={event => (this.utleienavn = event.target.value)} />

          <Form.Label>Stilling:</Form.Label>
          <Form.Input type="text" value={this.stilling} onChange={event => (this.stilling = event.target.value)} />
        </Card>

        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.add}>
              Registrer ansatt
            </button>
          </span>
          <span className="tilbakeMeny">
            <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
              Avbryt registrering
            </button>
          </span>
        </div>
      </div>
    );
  }

  add() {
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

  cancel() {
    history.push('/registrering/');
  }
}
