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


export class BestillingOversikt extends Component {
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
            <th>Delbestilling</th>
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
                <NavLink to={'/oversikt/bestilling/' + bestilling.bestillingsid + '/'}>Se</NavLink>
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

export class BestillingOversiktMeny extends Component {
  dbArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Delbestillingsnummer</th>
            <th>Registreringsnummer</th>
            <th>Utstyr</th>
            <th>Detaljer</th>
            <th>Bestillingsnummer</th>
          </Table.Rad>
          {this.dbArray.map(delbestilling => (
            <Table.Rad key={delbestilling.ubid}>
              <td>{delbestilling.ubid}</td>
              <td>{delbestilling.regnr}</td>
              <td>{delbestilling.utstyrsid}</td>
              <td>{delbestilling.detaljer}</td>
              <td>{delbestilling.bestillingsid}</td>
            </Table.Rad>
          ))}
        </Table>

        <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
          Gå tilbake
        </button>
      </div>
    );
  }

  mounted() {
    bestillingsService.getDelbestilling(this.props.match.params.ubid, delbestilling => {
      this.dbArray = delbestilling;
    });
  }

  cancel() {
    history.push('./Bestilling');
  }
}
