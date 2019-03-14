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

export class UtstyrReg extends Component {
  utstyrstypeid = '';
  ustatus = '';

  render() {
    return (
      <div className="mainView">
        <h3>Legg til utstyr</h3>
        <Card title="Endre utstyrsinformasjon">
          <Form.Label>Utstyrstype:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.utstyrstypeid = event.target.value)}>
            <option>Velg type her</option>
            <option value="1">Hjelm</option>
            <option value="2">Lappesett</option>
          </select>
          <Form.Label>Utstyrstatus:</Form.Label>
          <Form.Input type="text" value={this.ustatus} onChange={event => (this.ustatus = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.add}>
              Registrer utstyr
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
    utstyrService.addUtstyr(this.utstyrstypeid, this.ustatus, this.props.match.params.id, () => {
      history.push('/oversikt/utstyr');
    });
  }

  cancel() {
    history.push('/registrering/');
  }
}
