import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ansattService } from '../../Services/Ansatt';
import { bestillingsService } from '../../Services/Bestilling';
import { kundeService } from '../../Services/Kunde';
import { sykkelService } from '../../Services/Sykkel';
import { utleieService } from '../../Services/Utleie';
import { utstyrService } from '../../Services/Utstyr';
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
  utleietype = null;
  gruppe = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre kundeinformasjon">
          <Form.Label>Utleietype:</Form.Label>
          <select
            className="form-control"
            value={this.utleietype}
            onChange={event => (this.utleietype = event.target.value)}
          >
            <option>Utleie</option>
            <option value="1">Timesutleie</option>
            <option value="2">Dagsutleie</option>
            <option value="3">3-dagersutleie</option>
            <option value="4">Ukesleie</option>
          </select>

          <Form.Label>Gruppe:</Form.Label>
          <select className="form-control" value={this.gruppe} onChange={event => (this.gruppe = event.target.value)}>
            <option>Gruppe</option>
            <option value="1">Ja</option>
            <option value="2">Nei</option>
          </select>
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Endre bestilling
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
    bestillingsService.getBestilling(this.props.match.params.bestillingsid, bestilling => {
      this.utleietype = bestilling.utleietype;
      this.gruppe = bestilling.gruppe;
    });
  }
  save() {
    bestillingsService.updateBestilling(this.utleietype, this.gruppe, this.props.match.params.id, () => {
      history.push('/endring/bestillinger');
    });
  }
  cancel() {
    history.goBack();
  }
}
