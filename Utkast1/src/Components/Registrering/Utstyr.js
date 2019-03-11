import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import {ansattService} from '../../Services/Ansatt';
import {bestillingsService} from '../../Services/Bestilling';
import {kundeService} from '../../Services/Kunde';
import {sykkelService} from '../../Services/Sykkel';
import {utleieService} from '../../Services/Utleie';
import {utstyrService} from '../../Services/Utstyr';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../../widgets';
const history = createHashHistory();

export class UtstyrReg extends Component {
  utstyrstypeid = '';
  ustatus = '';

  render() {
    return (
      <div className="mainView">
        <h3>Legg til utstyr</h3>
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
