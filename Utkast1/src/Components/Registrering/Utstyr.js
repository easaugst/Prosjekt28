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
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <select
                className="form-control"
                form="formen"
                onChange={event => (this.utstyrstypeid = event.target.value)}
              >
                <option>Velg type her</option>
                <option value="1">Hjelm</option>
                <option value="2">Lappesett</option>
              </select>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Status"
                value={this.ustatus}
                onChange={event => (this.ustatus = event.target.value)}
              />
            </div>
            <br />

            <div className="tilbakeMeny2">
              <button type="button" className="btn btn-success" onClick={this.add}>
                Registrer utstyr
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
    utstyrService.addUtstyr(this.utstyrstypeid, this.ustatus, this.props.match.params.id, () => {
      history.goBack();
    });
  }

  cancel() {
    history.goBack();
  }
}
