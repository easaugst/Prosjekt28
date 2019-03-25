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
            <th>Betalingsmåte</th>
            <th>Tidspunkt bestilling</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Type bestilling</th>
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
                <List.Item to={'/oversikt/bestilling/' + bestilling.bestillingsid }>Se</List.Item>
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
  bid = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

  test = new BestillingOversikt();
  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Bestillingsnummer</th>
            <th>Delbestillingsnummer</th>
            <th>Registreringsnummer</th>
            <th>Utstyrsid</th>
            <th>Type</th>
          </Table.Rad>
          {this.dbArray.map(delbestilling => (
            <Table.Rad key={delbestilling.ubid}>
              <td>{delbestilling.bestillingsid}</td>
              <td>{delbestilling.ubid}</td>
              <td>{delbestilling.regnr}</td>
              <td>{delbestilling.utstyrsid}</td>
              <td>{delbestilling.utnavn}</td>
            </Table.Rad>
          ))}
        </Table>

        <Button.DangerOl onClick={this.cancel}>
          Gå tilbake
        </Button.DangerOl>
      </div>
    );
  }

  mounted() {
    bestillingsService.getDelbestilling(this.bid, this.props.match.params.ubid,  delbestilling => {
      this.dbArray = delbestilling;
    });

  }

  cancel() {
    history.push('/oversikt/bestilling');
  }
}
