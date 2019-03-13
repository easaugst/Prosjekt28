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

  render() {
    return (
      <div className="mainView">
        <h3>Legg til ansatt</h3>
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Tlf. nr."
                value={this.tlfnr}
                onChange={event => (this.tlfnr = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Epost"
                value={this.epost}
                onChange={event => (this.epost = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Fornavn"
                value={this.fnavn}
                onChange={event => (this.fnavn = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Etternavn"
                value={this.enavn}
                onChange={event => (this.enavn = event.target.value)}
              />
              <br />
              <select className="form-control" form="formen" onChange={event => (this.admin = event.target.value)}>
                <option>Er hen admin?</option>
                <option value="0">Nei</option>
                <option value="1">Ja</option>
              </select>
              <br />

              <input
                className="form-control"
                type="text"
                placeholder="Utleienavn"
                value={this.utleienavn}
                onChange={event => (this.utleienavn = event.target.value)}
              />
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
          </form>
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
