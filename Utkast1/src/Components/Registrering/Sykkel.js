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
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
const history = createHashHistory();

export class SykkelReg extends Component {
  regnr = '';
  sykkeltypeid = '';
  befinnelse = '';
  status = '';
  beskrivelse = '';
  bestilling = '';
  utleienavn = '';

  render() {
    return (
      <div className="mainView">
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <select
                className="form-control"
                value={this.sykkeltypeid}
                onChange={event => (this.sykkeltypeid = event.target.value)}
              >
                <option value="0">Sykkeltype</option>
                <option value="1">Terrengsykkel</option>
                <option value="2">Landeveissykkel</option>
                <option value="3">Tandemsykkel</option>
              </select>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Befinnelse"
                value={this.befinnelse}
                onChange={event => (this.befinnelse = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Status"
                value={this.status}
                onChange={event => (this.status = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Beskrivelse"
                value={this.beskrivelse}
                onChange={event => (this.beskrivelse = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Tilhører utleiested"
                value={this.utleienavn}
                onChange={event => (this.utleienavn = event.target.value)}
              />
            </div>
            <div className="tilbakeMeny2">
              <button type="button" className="btn btn-success" onClick={this.add}>
                Registrer sykkel
              </button>
            </div>
            <div className="tilbakeMeny">
              <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                Avbryt registrering
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  add() {
    sykkelService.addSykkel(
      this.sykkeltypeid,
      this.befinnelse,
      this.status,
      this.beskrivelse,
      this.utleienavn,
      this.props.match.params.id,
      () => {
        history.goBack();
      }
    );
  }
  cancel() {
    history.goBack();
  }
}
