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
            <th>Endre</th>
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
                <NavLink to={'/endring/bestilling/' + bestilling.bestillingsid + '/'}>Endre</NavLink>
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
  fnavn = null;
  enavn = null;
  epost = null;
  tlf = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre kundeinformasjon">
          <Form.Label>Fornavn:</Form.Label>
          <Form.Input type="text" value={this.fnavn} onChange={event => (this.fnavn = event.target.value)} />

          <Form.Label>Etternavn:</Form.Label>
          <Form.Input type="text" value={this.enavn} onChange={event => (this.enavn = event.target.value)} />

          <Form.Label>Epost:</Form.Label>
          <Form.Input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />

          <Form.Label>Tlf:</Form.Label>
          <Form.Input type="text" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Registrer kunde
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
  mounted() {
    kundeService.getKunde(this.props.match.params.kundenr, kunde => {
      this.fnavn = kunde.fnavn;
      this.enavn = kunde.enavn;
      this.epost = kunde.epost;
      this.tlf = kunde.tlf;
    });
  }
  save() {
    kundeService.updateKunde(this.fnavn, this.enavn, this.epost, this.tlf, this.props.match.params.id, () => {
      history.push('/endring/kunde');
    });
  }
  cancel() {
    history.goBack();
  }
}
