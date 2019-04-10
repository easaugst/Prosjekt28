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
  lArray = [];    //Inneholder lokasjoner he tet fra databasen. Brukes for .map(...) av tabell

  //sideMengde, sider, aktivSide og sisteSide brukes til å dele tabelloversikten inn i flere sider. 'sider' brukes for .map() av sidene
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  lokasjoner = '';    //Antall lokasjoner. Brukes til å dele tabelloversikten inn i flere sider

  render() {
    return (
      <div className="mainView">
        {/*  Se ..Endring/Ansatt  */}
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
              {/*  Se ..Endring/Ansatt  */}
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
