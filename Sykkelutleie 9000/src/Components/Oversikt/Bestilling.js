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
  bArray = [];    //Inneholder bestillinger hentet fra databasen. Brukes for .map(...) av tabell

  //sideMengde, sider, aktivSide og sisteSide brukes til å dele tabelloversikten inn i flere sider. 'sider' brukes for .map() av sidene
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  bestillinger = '';    //Antall bestillinger. Brukes til å dele tabelloversikten inn i flere sider

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
        <Form.Label>Filtrér:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn" autoFocus></Form.Input>
      </div>
        {/*  Se ../Endring/Ansatt  */}
        {this.sider.map(mengde => (
          <div id={'side' + mengde.sideMengde} key={mengde.sideMengde.toString()}>
            <div className="sideKnapper">
              <span className="sideKnapp1">
                <Button.Primary onClick={this.pageSwitchH}>Første Side</Button.Primary>
              </span>
              <span className="sideKnapp2">
                <Button.Primary onClick={this.pageSwitchP}>Forrige Side</Button.Primary>
              </span>
              <span className="sideKnapp3">
                <Button.Primary onClick={this.pageSwitchN}>Neste Side</Button.Primary>
              </span>
              <span className="sideKnapp4">
                <Button.Primary onClick={this.pageSwitchL}>Siste Side</Button.Primary>
              </span>
            </div>
            <Table>
              <Table.Rad>
                <th>Bestilling</th>
                <th>Kunde</th>
                <th>Ansatt</th>
                <th>Status</th>
                <th>Utleiested</th>
                <th>Utleietype</th>
                <th>Betalingsmåte</th>
                <th>Tidspunkt bestilling</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Type bestilling</th>
                <th>Delbestilling</th>
              </Table.Rad>
              {/*  Se ../Endring/Ansatt  */}
              {this.bArray.slice(mengde.forrigeSide, mengde.sideMengde).map(bestilling => (
                <Table.Rad key={bestilling.bestillingsid}>
                  <td>{bestilling.bestillingsid}</td>
                  <td>{bestilling.kundenr}</td>
                  <td>{bestilling.ansattnr}</td>
                  <td>{bestilling.status}</td>
                  <td>{bestilling.utleiested}</td>
                  <td>{bestilling.utleietype}</td>
                  <td>{bestilling.kontant}</td>
                  <td>
                    {bestilling.btid.toLocaleString()
                    .replace(/,/g, '')
                    .slice(0, -3)}
                  </td>
                  <td>
                    {bestilling.ftid.toLocaleString()
                    .replace(/,/g, '')
                    .slice(0, -3)}
                  </td>
                  <td>
                    {bestilling.ttid.toLocaleString()
                    .replace(/,/g, ' ')
                    .slice(0, -3)}
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
    bestillingsService.getBestilling(bestilling => {
      this.bArray = bestilling;
    });
  }
  filter() {
    var tekst = document.getElementById('input').value;
    tekst = "%" + tekst + "%";

      bestillingsService.getBestillingFilt(tekst, bestillingF => {
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
    pageSwitchL() {
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
      this.aktivSide = this.sider.length - 1;
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
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
          {/*  Se ../Endring/Ansatt  */}
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

        <Button.Primary onClick={this.cancel}>
          Gå tilbake
        </Button.Primary>
      </div>
    );
  }

  mounted() {
    window.scrollTo(0,0);
    bestillingsService.getDelbestilling(this.props.match.params.bestillingsid, delbestilling => {
      this.dbArray = delbestilling;
    });

  }

  cancel() {
    history.push('/oversikt/bestilling');
  }
}
