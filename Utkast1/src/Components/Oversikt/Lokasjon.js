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
import { lokasjonService } from '../../Services/Lokasjon';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../../widgets';
const history = createHashHistory();

export class LokasjonOversikt extends Component {
  lArray = [];
  number = 0;
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  lokasjoner = '';

  render() {
    return (
      <div className="mainView">
        {/*<div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
          <select id="drop" className="form-control" form="formen" onChange={this.filter}>
            <option value="0">Alle</option>
            <option value="1">Terrengsykkel</option>
            <option value="2">Landeveissykkel</option>
            <option value="3">Tandemsykkel</option>
            <option value="12">Downhillsykkel</option>
            <option value="13">Racersykkel</option>
            <option value="14">Barnesykkel</option>
          </select>
        </div>*/}
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
                <th>Utleienavn</th>
                <th>Adresse</th>
                <th>Postnr</th>
                <th>Poststed</th>
              </Table.Rad>
              {this.lArray.slice(mengde.forrigeSide, mengde.sideMengde).map(lokasjon => (
                <Table.Rad key={lokasjon.postnr}>
                  <td>{lokasjon.utleienavn}</td>
                  <td>{lokasjon.adresse}</td>
                  <td>{lokasjon.postnr}</td>
                  <td>{lokasjon.poststed}</td>
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
    lokasjonService.countLokasjoner(lokasjoner => {
      this.lokasjoner = parseInt(lokasjoner.substr(lokasjoner.lastIndexOf(':') + 1));
      console.log(this.lokasjoner);
      this.lokasjonSortering();
    });
    lokasjonService.getLokasjon(lokasjon => {
      this.lArray = lokasjon;
      console.log(lokasjon);
    });
  }

  filter() {}

  pages() {
    this.sideMengde = parseInt(document.getElementById('sidemengde').value);
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

  lokasjonSortering() {
    if (this.lokasjoner > this.sideMengde) {
      this.sisteSide = this.lokasjoner % this.sideMengde;
      this.lokasjoner -= this.sisteSide;
      console.log(this.lokasjoner, this.sisteSide);
    }
    for (var i = 1; i <= (this.lokasjoner / this.sideMengde + 1); i++) {
      if (i == (this.lokasjoner / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde});
          console.log('Første side opprettet: ', this.sider[0]);
        } else {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde });
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
  }
}
