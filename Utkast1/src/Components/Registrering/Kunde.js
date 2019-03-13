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
        <h3>Legg til kunde</h3>
        <div className="KundeReg">
          <form>
            <div className="form-group">
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
              <input
                className="form-control"
                type="text"
                maxLength="12"
                placeholder="12345678"
                value={this.tlf}
                onChange={event => (this.tlf = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="email"
                placeholder="Epost"
                value={this.epost}
                onChange={event => (this.epost = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="date"
                placeholder="Fødselsdato"
                value={this.fdag}
                onChange={event => (this.fdag = event.target.value)}
              />
              <br />

              <div className="knapper">
                <span className="tilbakeMeny2">
                  <button type="button" className="btn btn-success" onClick={this.add}>
                    Registrer kunde
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
    kundeService.addKunde(this.fnavn, this.enavn, this.tlf, this.epost, this.fdag, this.props.match.params.id, () => {
      history.push('/oversikt/kunde');
    });
    kundeService.newDate(() => {});
  }

  cancel() {
    history.push('/registrering/');
  }
}
