import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { sykkelService } from '../Services/Sykkel';
import { kundeService } from '../Services/Kunde';
import { utstyrService } from '../Services/Utstyr';
import { ansattService } from '../Services/Ansatt';
import { bestillingsService } from '../Services/Bestilling';
import { utleieService } from '../Services/Utleie';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../widgets';
import Select from 'react-dropdown-select'; //npm install react-dropdown-select
const history = createHashHistory();

export class Utleie extends Component {
  //Henting av kunder og valg av kunde
  kunde = [];kundeDrop = [];state = {values: []};

  uType = '';
  kontant = '';
  ftid = '';
  gruppe = '';

  bId = '';
  sykkelType = '';
  utstyrType = '';

  regnr = [];
  uId = [];
  uBestilling = [this.regnr, this.uId];

  number = 1;

  render() {
    return (
      <div className="mainView">
        <div className="mainViewUtleie">
            {/*kundenr, utleietype, ftid, ttid, gruppe*/}
          <form>
            <div className="form-group" id="utleie1">
              <label>Kundevalg</label> <br />
                <Select className="form-control"
                  value={this.kundeValg}
                  options={this.kundeDrop}
                  valueField="key"
                  labelField="text"
                  placeholder="Velg kunde..."
                  onChange={values => this.setState({ values })}
                  onDropdownOpen={this.dropDown}
                  clearable
                />
                <br />
                <input type="checkbox" name="Gruppe" value="Gruppe" onChange={event => (this.gruppe = event.target.value)}/> Gruppebestilling
                <br />
              <label>Type leie</label>
                <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                  <option>Velg tid</option>
                  <option value="1">Timesutleie</option>
                  <option value="2">Dagsutleie</option>
                  <option value="3">3-dagersutleie</option>
                  <option value="4">Ukesleie</option>
                </select>
              <label>Bestilling begynner</label>
                <input className="form-control" type="date" value={this.ftid} onChange={event => (this.ftid = event.target.value)} />
            </div>
            <div className="form-group" id="utleie2">
                <label>Sykkeltype</label>
                  <select className="form-control" onChange={event => (this.sykkelType = event.target.value)}>
                    <option>Velg sykkel</option>
                    <option value="1">Terrengsykkel</option>
                    <option value="2">Landeveisykkel</option>
                    <option value="3">Tandemsykkel</option>
                  </select>
                  <Button.Light>Legg til sykkel</Button.Light>
                <label>Utstyr</label>
                  <select className="form-control" onChange={event => (this.utstyrType = event.target.value)}>
                    <option>Ingen</option>
                    <option value="1">Hjelm</option>
                    <option value="2">Lappesett</option>
                    <option value="3">Bagasjebrett</option>
                    <option value="4">Sykkelveske</option>
                  </select>
                  <Button.Light>Legg til utstyr</Button.Light>
            </div>
            <div className="form-group" id="utleie3">
              <h1>Bestillingen</h1>
            </div>
            <Row>
              <Column>
                <Button.Danger onClick={this.prevPage}>Tilbake</Button.Danger>
              </Column>
              <Column>
                <Button.Success id="nesteUtleie" onClick={this.nextPage}>Neste side</Button.Success>
              </Column>
            </Row>
            <Button.Light onClick={this.log}>Logg Select</Button.Light>
          </form>
        </div>
        <div className="mainViewUtleie2">

        </div>
      </div>
    );
  }
  componentDidMount() {
    this.dropDown();
    console.log(window.ansatt);
  }
  log() {
    console.log(
      'kundenr:' + this.state.values[0].key,    //Henter kundenummeret til valgt kunde med this.state.values[0].key
      'utleieType:' + this.uType,
      'kontant:' + this.kontant,
      'fratid:' + this.ftid,
      'Gruppe:' + this.gruppe
    );
    console.log(
      'sykkelType:' + this.sykkelType,
      'utstyrstype:' + this.utstyrType
    );
  }
  dropDown() {
    utleieService.getDropdown(kundenr => {
      this.kunde = JSON.parse(kundenr);
    });

    this.kundeDrop = [];
    this.kunde.map(kunde => {
      this.kundeDrop.push({key: parseInt(kunde.kundenr), text: kunde.fnavn + ' ' + kunde.enavn});
    });
    this.t++;
    console.log(this.kundeDrop);
  }
  nextPage() {
    if (this.number < 3) {
      document.getElementById('utleie' + this.number).style.display = "none";
      this.number++;
      document.getElementById('utleie' + this.number).style.display = "block";
      if (this.number == 3) {
        document.getElementById('nesteUtleie').innerHTML = "Fullfør";
      }
    }
  }
  prevPage() {
    if (this.number > 1) {
      document.getElementById('utleie' + this.number).style.display = "none";
      this.number--;
      document.getElementById('utleie' + this.number).style.display = "block";
      if (this.number != 3) {
        document.getElementById('nesteUtleie').innerHTML = "Neste side";
      }
    }
  }
  order() {
    utleieService.addBestilling(this.state.values[0].key, this.kontant, this.ftid, this.gruppe, () => {
      console.log(this.state.values[0].key, this.uType, this.kontant, this.ftid, this.gruppe);
    })
    utleieService.getBestilling(bestilling => {
      this.bId = bestilling;
    })
    utleieService.addUBestilling(this.regnr, this.uId, this.detaljer, this.bId, () => {
      console.log(this.regnr, this.uId, this.detaljer, this.bId);
    })
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
