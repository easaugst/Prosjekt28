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

export class BestillingsEndring extends Component {
  bArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Bestillingsnummer</th>
            <th>Kundenummer</th>
            <th>Utleietype</th>
            <th>Kontant</th>
            <th>Tidspunkt bestilling</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Gruppe</th>
            <th>Rediger</th>
          </Table.Rad>
          {this.bArray.map(bestilling => (
            <Table.Rad key={bestilling.bestillingsid}>
              <td>{bestilling.bestillingsid}</td>
              <td>{bestilling.kundenr}</td>
              <td>{bestilling.utleietype}</td>
              <td>{bestilling.kontant}</td>
              <td>
                {JSON.stringify(bestilling.btid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>
                {JSON.stringify(bestilling.ftid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>
                {JSON.stringify(bestilling.ttid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>{bestilling.gruppe}</td>
              <td>
                <List.Item to={'/endring/bestilling/' + bestilling.bestillingsid}>Rediger</List.Item>
              </td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }

  mounted() {
    bestillingsService.getBestilling(this.props.match.params.bestillingsid, bestilling => {
      this.bArray = bestilling;
    });
  }
}

export class BestillingsEndringMeny extends Component {
  bestillingsid = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  bestilling = [];
  utleietype = null;
  gruppe = null;
  kontant = null;
  kundenr = "";

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div>
        <div className="mainView">

          {this.bestilling.map(bestilling => (
            <Card title="Nåværende bestillingsinformasjon" key={bestilling.kundenr}>
              <Form.Label>Kundenr:</Form.Label>
                <Form.Input
                type="text"
                id="kundeDef"
                value={bestilling.kundenr}
                onChange={event => (this.kundenr = event.target.value)}
                disabled
                />

              <Form.Label>Utleietype:</Form.Label>
                <select
                className="form-control"
                id="utleieDef"
                value={bestilling.utleietype}
                onChange={event => (this.utleietype = event.target.value)}
                disabled
                >
                  <option>Velg utleietype</option>
                  <option value="1">Timesleie</option>
                  <option value="2">Dagsleie</option>
                  <option value="3">3-dagersleie</option>
                  <option value="4">Ukesleie</option>
                </select>

              <Form.Label>Endre betalingsmåte:</Form.Label>
                <select
                className="form-control"
                id="kontantDef"
                value={bestilling.kontant}
                onChange={event => (this.kontant = event.target.value)}
                disabled
                >
                  <option>Type betaling</option>
                  <option value="Kort">Kort</option>
                  <option value="Kontant">Kontant</option>
                </select>

              <Form.Label>Gruppe:</Form.Label>
                <select className="form-control" id="gruppeDef" value={bestilling.gruppe} onChange={event => (this.gruppe = event.target.value)} disabled>
                  <option>Gruppe</option>
                  <option value="1">Ja</option>
                  <option value="2">Nei</option>
                </select>
            </Card>
          ))}
        </div>
        <div className="parallelView">
          {this.bestilling.map(bestilling => (
            <Card title="Endring" key={bestilling.kundenr}>
              <Form.Label>Kundenr:</Form.Label>
                <Form.Input
                type="text"
                id="kundeInput"
                value={this.kundenr}
                placeholder={bestilling.kundenr}
                onChange={event => (this.kundenr = event.target.value)}
                />

              <Form.Label>Utleietype:</Form.Label>
                <select
                className="form-control"
                id="utleieInput"
                value={this.utleietype}
                onChange={event => (this.utleietype = event.target.value)}
                >
                  <option>Velg utleietype</option>
                  <option value="1">Timesleie</option>
                  <option value="2">Dagsleie</option>
                  <option value="3">3-dagersleie</option>
                  <option value="4">Ukesleie</option>
                </select>

              <Form.Label>Endre betalingsmåte:</Form.Label>
                <select
                className="form-control"
                id="kontantInput"
                value={this.kontant}
                onChange={event => (this.kontant = event.target.value)}
                >
                  <option>Type betaling</option>
                  <option value="Kort">Kort</option>
                  <option value="Kontant">Kontant</option>
                </select>

              <Form.Label>Gruppe:</Form.Label>
                <select className="form-control" id="gruppeInput" value={this.gruppe} onChange={event => (this.gruppe = event.target.value)}>
                  <option>Gruppe</option>
                  <option value="1">Ja</option>
                  <option value="2">Nei</option>
                </select>
            </Card>
          ))}
          <br />
          <div className="knapper">
            <span className="tilbakeMeny2">
              <Button.Success onClick={this.save}>
                Lagre endring
              </Button.Success>
            </span>
            <span className="tilbakeMeny">
              <Button.DangerOl onClick={this.cancel}>
                Avbryt
              </Button.DangerOl>
            </span>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    bestillingsService.getBestillingEndring(this.bestillingsid, bestilling => {
      this.bestilling = bestilling;
    });
    console.log(this.kundenr);
    this.log;
  }
  save() {
    if (document.getElementById('kundeInput').value === "") {
      this.kundenr = document.getElementById('kundeDef').value;
      console.log(this.kundenr);
    }
    if (this.utleietype === null) {
      this.utleietype = document.getElementById('utleieDef').value;
      console.log(this.utleietype);
    }
    if (this.kontant === null) {
      this.kontant = document.getElementById('kontantDef').value;
      console.log(this.kontant);
    }
    if (this.gruppe === null) {
      this.gruppe = document.getElementById('gruppeDef').value;
      console.log(this.gruppe);
    }
    bestillingsService.updateBestilling(this.kundenr, this.utleietype, this.kontant, this.gruppe, this.bestillingsid, () => {
      history.push('/endring/bestillinger');
    });
  }
  cancel() {
    history.goBack();
  }

  log() {
    if (document.getElementById('kundeInput').value === "") {
      this.kundenr = document.getElementById('kundeDef').value;
      console.log(this.kundenr);
    }
    if (this.utleietype === null) {
      this.utleietype = document.getElementById('utleieDef').value;
      console.log(this.utleietype);
    }
    if (this.kontant === null) {
      this.kontant = document.getElementById('kontantDef').value;
      console.log(this.kontant);
    }
    if (this.gruppe === null) {
      this.gruppe = document.getElementById('gruppeDef').value;
      console.log(this.gruppe);
    }
  }
}
