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
  tekst = "";
  ftekst ="";
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  bestillinger = '';

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
        <Form.Label>Filtrer:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
        {this.sider.map(mengde => (
          <div id={'side' + mengde.sideMengde} key={mengde.sideMengde.toString()}>
            <Button.Light onClick={this.pageSwitchH}>Første Side</Button.Light>
            <Button.Light onClick={this.pageSwitchP}>Forrige Side</Button.Light>
            <Button.Light onClick={this.pageSwitchN}>Neste Side</Button.Light>
            <Table>
              <Table.Rad>
                <th>Bestillingsnummer</th>
                <th>Kundenummer</th>
                <th>Ansattnummer</th>
                <th>Utleietype</th>
                <th>Betalingsmåte</th>
                <th>Tidspunkt bestilling</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Type bestilling</th>
                <th>Delbestilling</th>
              </Table.Rad>
              {this.bArray.slice(mengde.forrigeSide, mengde.sideMengde).map(bestilling => (
                <Table.Rad key={bestilling.bestillingsid}>
                  <td>{bestilling.bestillingsid}</td>
                  <td>{bestilling.kundenr}</td>
                  <td>{bestilling.ansattnr}</td>
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
                    .slice(0, -9)}
                  </td>
                  <td>
                    {JSON.stringify(bestilling.ttid)
                    .replace(/T|Z|"/g, ' ')
                    .slice(0, -9)}
                  </td>
                  <td>{bestilling.gruppe}</td>
                  <td>
                  <List.Item to={'/oversikt/bestilling/' + bestilling.bestillingsid }>Se</List.Item>
                  </td>
                  </Table.Rad>
                ))}
            </Table>
          </div>
        ))}
      </div>
    );
  }

  mounted() {
    window.scrollTo(0, 0);
    bestillingsService.countBestilling(bestilling => {
      this.bestillinger = parseInt(bestilling.substr(bestilling.lastIndexOf(':') + 1));
      console.log(this.bestillinger);
      this.bestillingSortering();
    })
    bestillingsService.getBestilling(this.props.match.params.bestillingsid, bestilling => {
      this.bArray = bestilling;
    });
  }
  filter() {
    this.tekst = document.getElementById('input').value;
    this.ftekst = "%" + this.tekst + "%";

      bestillingsService.getBestillingFilt(this.ftekst, this.ftekst, bestillingF => {
        this.bArray = bestillingF;
      });
    this.pageSwitchH();
    this.forceUpdate();
  }
  pageSwitch(retning) {
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
    document.getElementById('side' + this.sider[retning].sideMengde).style.display = 'block';

  }
    pageSwitchH() {
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
      this.aktivSide = 0;
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
    }
    pageSwitchN() {
      if (this.aktivSide < this.sider.length - 1) {
        this.pageSwitch(this.aktivSide + 1)
        this.aktivSide++;
      }
    }
    pageSwitchP() {
      if (this.aktivSide > 0) {
        this.pageSwitch(this.aktivSide - 1);
        this.aktivSide--;
      }
    }
  bestillingSortering() {
    if (this.bestillinger > this.sideMengde) {
      this.sisteSide = this.bestillinger % this.sideMengde;
      this.bestillinger -= this.sisteSide;
      console.log(this.bestillinger, this.sisteSide);
    }
    for (var i = 1; i <= (this.bestillinger / this.sideMengde + 1); i++) {
      if (i == (this.bestillinger / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });
          console.log('Første side opprettet:', this.sider[0]);
        } else {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde });
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
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
