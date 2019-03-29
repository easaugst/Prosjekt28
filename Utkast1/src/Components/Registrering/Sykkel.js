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
          <Form.Input type="text" value={this.befinnelse} onChange={event => (this.befinnelse = event.target.value)} />

          <Form.Label>Beskrivelse:</Form.Label>
          <Form.Input
            type="text"
            value={this.beskrivelse}
            onChange={event => (this.beskrivelse = event.target.value)}
          />

          <Form.Label>Tilhører utleiested:</Form.Label>
          <Form.Input type="text" value={this.utleienavn} onChange={event => (this.utleienavn = event.target.value)} />
        </Card>
        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success onClick={this.add}>Registrer sykkel</Button.Success>
          </span>
          <span className="tilbakeMeny">
            <Button.Light onClick={this.cancel}>Avbryt registrering</Button.Light>
          </span>
        </div>
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
