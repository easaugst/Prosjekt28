import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import {ansattService} from '../Services/Ansatt';
import {bestillingsService} from '../Services/Bestilling';
import {kundeService} from '../Services/Kunde';
import {sykkelService} from '../Services/Sykkel';
import {utleieService} from '../Services/Utleie';
import {utstyrService} from '../Services/Utstyr';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../widgets';
const history = createHashHistory();


export class Utleie extends Component {
  render() {
    return (
      <div className="mainView">
        <div className="mainViewUtleie">
          <h3>Legg til bestilling</h3>
          <form>
            <div className="form-group">
              <label>Telefonnummer</label>
              <input className="form-control" type="number" placeholder="Telefonnummer" value="" onChange="" />
              <label>Sykkeltype</label>
              <select className="form-control">
                <option>Terrengsykkel</option>
                <option>Landeveisykkel</option>
                <option>Tandemsykkel</option>
              </select>
              <label>Utstyr</label>
              <select className="form-control">
                <option>Ingen</option>
                <option>Hjelm</option>
                <option>Bagasjebrett</option>
                <option>Sykkelveske</option>
              </select>
              <select className="form-control" placeholder="Antall">
                <option>Ingen</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
              <label>Type leie</label>
              <select className="form-control">
                <option>Timesutleie</option>
                <option>Dagsutleie</option>
                <option>3-dagersutleie</option>
                <option>Ukesleie</option>
              </select>
            </div>
          </form>
        </div>

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Legg til
            </button>
          </span>
          <span className="tilbakeMeny">
            <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
              Avbryt
            </button>
          </span>
        </div>
      </div>
    );
  }
  // LEGG TIL BESTILLING-KNAPP IKKE FIKSET
  /*
  add() {
    sykkelService.addSykkel(
      this.sykkeltypeid,
      this.befinnelse,
      this.status,
      this.beskrivelse,
      this.utleienavn,
      this.props.match.params.id,
      () => {
        history.push('/oversikt/bestilling');
      }
    );
  } */
  cancel() {
    history.goBack();
  }
}

export class UtleieVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/utleie/kundereg">
          <ion-icon name="person-add" />
          Registrer kunde
        </NavCol.Link>
      </NavCol>
    );
  }
}
