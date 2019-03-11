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
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
const history = createHashHistory();

export class Utleie extends Component {
  kunde = [];
  kundeDrop = [];

  uType = '';
  kontant = '';
  ftid = '';
  gruppe = '';

  bId = '';
  sType = '';
  uType = '';

  regnr = [];
  uId = [];
  uBestilling = [this.regnr, this.uId];
  render() {
    return (
      <div className="mainView">
        <div className="mainViewUtleie">
          {/*Dropdown gjøres senere; Kundevalg*/}
            {/*kundenr, utleietype, ftid, ttid, gruppe*/}
          <form>
            <div className="form-group" id="utleie1">
              <label>Kundevalg</label>
                <Dropdown placeholder="Velg Kunde" fluid search selection options={this.kundeDrop} onClick={this.dropDown}/>
                <input type="checkbox" name="Gruppe" value="1" /> Gruppebestilling
                <br />
              <label>Type leie</label>
                <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                  <option>Velg tid</option>
                  <option value="">Timesutleie</option>
                  <option>Dagsutleie</option>
                  <option>3-dagersutleie</option>
                  <option>Ukesleie</option>
                </select>
              <label>Bestilling begynner</label>
                <input className="form-control" type="date" value={this.ftid} onChange={event => (this.ftid = event.target.value)} />
            </div>
            <div className="form-group" id="utleie2">
                <label>Sykkeltype</label>
                  <select className="form-control" onChange={event => (this.sType = event.target.value)}>
                    <option>Velg sykkel</option>
                    <option value="1">Terrengsykkel</option>
                    <option value="2">Landeveisykkel</option>
                    <option value="3">Tandemsykkel</option>
                  </select>
                  <Button.Light>Legg til sykkel</Button.Light>
                <label>Utstyr</label>
                  <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                    <option>Ingen</option>
                    <option value="1">Hjelm</option>
                    <option value="2">Lappesett</option>
                    <option>Bagasjebrett</option>
                    <option>Sykkelveske</option>
                  </select>
                  <Button.Light>Legg til utstyr</Button.Light>
            </div>
            <div className="form-group" id="utleie3">
              <h1>Bestillingen</h1>
            </div>
            <Row>
              <Column>
                <Button.Danger onClick={this.prevPage}>Avbryt</Button.Danger>
              </Column>
              <Column>
                <Button.Success onClick={this.nextPage}>Neste side</Button.Success>
              </Column>
            </Row>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.dropDown();
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
      // for (this.t = 0; this.t <= this.kunde.length; this.t++){
      //     this.kundeDrop.push({key: parseInt(this.kunde[this.t].kundenr), text: this.kunde[this.t].fnavn + ' ' + this.kunde[this.t].enavn});
      //   };
    console.log(this.kundeDrop);
  }
  nextPage() {
    document.getElementById('utleie' + this.number).style.display = "none";
    this.number++;
    document.getElementById('utleie' + this.number).style.display = "block";
  }
  prevPage() {
    document.getElementById('utleie' + this.number).style.display = "none";
    this.number--;
    document.getElementById('utleie' + this.number).style.display = "block";
  }
  order() {
    utleieService.addBestilling(this.kunde, this.uType, this.kontant, this.ftid, this.gruppe, () => {
      console.log(this.kunde, this.kontant, this.ftid, this.group);
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
