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
import Select from 'react-dropdown-select'; //npm install react-dropdown-select
const history = createHashHistory();

export class Utleie extends Component {
  //Henting av kunder og valg av kunde
  kunde = [];
  kundenr = '';
  kundeDrop = [];
  state = { values: [] };
  sState = { values: []};

  uType = '';
  kontant = '';
  ftid = '';
  gruppe = '';
  detaljer = 'Ikke spesifisert';

  bId = '';
  sykkelType = '';
  sykkelTypeText = '';
  utstyrType = '';
  utstyrTypeText = '';

  tSykler = [];
  sTyper = [];
  sykler = [];
  utstyr = [];
  regnr = [];
  uId = [];
  uBestilling = [this.regnr, this.uId];

  number = 1;

  render() {
    return (
      <div className="mainView">
        <div className="mainViewUtleie">
          {/*kundenr, utleietype, ftid, ttid, gruppe*/}
          <form>
            <div className="form-group" id="utleie1">
              <label>Kundevalg</label> <br />
              <Select
                className="form-control"
                options={this.kundeDrop}
                valueField="key"
                labelField="text"
                placeholder="Velg kunde..."
                onChange={values => this.setState({ values })}
                onDropdownOpen={this.kundeDropDown}
                clearable
              />
              <br />
              <input
                type="checkbox"
                name="Gruppe"
                value="Gruppe"
                onChange={event => (this.gruppe = event.target.value)}
              />
              Gruppebestilling
              <br />
              <label>Type leie</label>
              <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                <option>Velg tid</option>
                <option value="1">Timesutleie</option>
                <option value="2">Dagsutleie</option>
                <option value="3">3-dagersutleie</option>
                <option value="4">Ukesleie</option>
              </select>
              <label>Bestilling begynner</label>
              <input
                className="form-control"
                type="date"
                value={this.ftid}
                onChange={event => (this.ftid = event.target.value)}
              />
            </div>
            <div className="form-group" id="utleie2">
              <label>Sykkeltype</label>
              <select className="form-control" onChange={event => (this.sykkelType = event.target.value)}>
                <option>Velg sykkel</option>
                <option value="1">Terrengsykkel</option>
                <option value="2">Landeveisykkel</option>
                <option value="3">Tandemsykkel</option>
              </select>
              <Button.Light onClick={this.addSykkel}>Legg til sykkel</Button.Light>
              <label>Utstyr</label>
              <select className="form-control" onChange={event => (this.utstyrType = event.target.value)}>
                <option>Ingen</option>
                <option value="4">Hjelm</option>
                <option value="5">Lappesett</option>
              </select>
              <Button.Light onClick={this.addUtstyr}>Legg til utstyr</Button.Light>
            </div>
            <div className="form-group" id="utleie3">
              <h1>Bestillingen</h1>
            </div>
            <Row>
              <Column>
                <Button.Danger onClick={this.prevPage}>
                  <ion-icon name="arrow-back" />
                  Tilbake
                </Button.Danger>
              </Column>
              <Column>
                <Button.Success id="nesteUtleie" onClick={this.nextPage}>
                  Neste side
                  <ion-icon name="arrow-forward" />
                </Button.Success>
              </Column>
            </Row>
            <Button.Light onClick={this.log}>Logg Select</Button.Light>
          </form>
        </div>
        <div className="mainViewUtleie2" />
        <div id="dBestOversikt">
          <Table>
            <Table.Rad>
              <th>Terrengsykkel</th>
              <th>Landeveisykkel</th>
              <th>Tandemsykkel</th>
              <th>Totalt</th>
            </Table.Rad>
            <Table.Rad>
              <td id="antallSykler1"></td>
              <td id="antallSykler2"></td>
              <td id="antallSykler3"></td>
              <td id="antallSykler"></td>
            </Table.Rad>
          </Table>
          <Table>
            <Table.Rad>
              <th>Hjelm</th>
              <th>Lappesett</th>
              <th>Totalt</th>
            </Table.Rad>
            <Table.Rad>
              <td id="antallUtstyr4"></td>
              <td id="antallUtstyr5"></td>
              <td id="antallUtstyr"></td>
            </Table.Rad>
          </Table>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.kundeDropDown();
  }
  log() {
    // console.log(
    //   'kundenr:' + this.state.values[0].key, //Henter kundenummeret til valgt kunde med this.state.values[0].key
    //   'utleieType:' + this.uType,
    //   'kontant:' + this.kontant,
    //   'fratid:' + this.ftid,
    //   'Gruppe:' + this.gruppe
    // );
    // this.kundenr = this.state.values[0].key;
    // console.log('this.kundenr: ' + this.kundenr);
      //Forsøk på å automatisk registrere tilgjengelige sykler
  //   this.sykler.sort();
  //   for (var i = 1; i <= this.sykler.length; i++) {
  //     if (this.sykler.includes(i) == true) {
  //       this.sTyper.push(i);
  //     }
  //     console.log('Kjørt ' + i + ' gang(er)');
  //   }
  //   console.log(this.sTyper);
  //   for (var i = 0; i <= this.sTyper.length; i++) {
  //     utleieService.getSykler(this.sTyper[i], (this.sykler.lastIndexOf(i) - this.sykler.indexOf(i) + 1), tSykler => {
  //       this.tSykler.push(tSykler);
  //     });
  //   }
  //   console.log(this.tSykler);
  //   console.log(this.tSykler[10 ].regnr);
    console.log(this.sykkelType);
  }

  kundeDropDown() {
    utleieService.getDropdown(kundenr => {
      this.kunde = JSON.parse(kundenr);
    });

    this.kundeDrop = [];
    this.kunde.map(kunde => {
      this.kundeDrop.push({ key: parseInt(kunde.kundenr), text: kunde.fnavn + ' ' + kunde.enavn });
    });
    this.t++;
    console.log(this.kundeDrop);
  }
  addSykkel() {
    this.sykler.push(parseInt(this.sykkelType));
    console.log(this.sykler);
    document.getElementById('antallSykler' + this.sykkelType).innerHTML = (this.sykler.sort().lastIndexOf(parseInt(this.sykkelType)) - this.sykler.sort().indexOf(parseInt(this.sykkelType)) + 1);
    document.getElementById('antallSykler').innerHTML = this.sykler.length;
  }
  addUtstyr() {
    this.utstyr.push(parseInt(this.utstyrType));
    console.log(this.utstyr);
    document.getElementById('antallUtstyr' + this.utstyrType).innerHTML = (this.utstyr.sort().lastIndexOf(parseInt(this.utstyrType)) - this.utstyr.sort().indexOf(parseInt(this.utstyrType)) + 1);
    document.getElementById('antallUtstyr').innerHTML = this.utstyr.length;
  }
  order() {
    //Sjekker om det er tilstrekkelig med tilgjengelige sykler og utstyr på lager
    for (var i = 1; i <= this.sykler.length; i++) {
      c = 1;
      switch (this.sykler.includes(c)) {
        case true:
          utleieService.getSykler(c, (this.sykler.indexOf(c) - this.sykler.lastIndexOf(c) + 1), tSykler => {
            this.tSykler.push = tSykler;
          });
          c++;
          break;
        case false:
          c++;
      }
    }
    //Overbestilling opprettes
    this.sykler.sort();
    this.utstyr.sort();
    utleieService.addBestilling(this.state.values[0].key, this.uType, this.kontant, this.ftid, this.gruppe, () => {
      console.log(this.state.values[0].key, this.uType, this.kontant, this.ftid, this.gruppe);
    });

    //Delbestillinger for sykler opprettes

    // utleieService.getBestilling(bestilling => {
    //   this.bId = bestilling;
    // });
    // utleieService.addUBestilling(this.regnr, this.uId, this.detaljer, this.bId, () => {
    //   console.log(this.regnr, this.uId, this.detaljer, this.bId);
    // });
  }
  nextPage() {
    if (this.number < 3) {
      document.getElementById('utleie' + this.number).style.display = 'none';
      // if (this.number == 1) {
      //   document.getElementById('dBestOversikt').style.display = 'block';
      // } else if (this.number != 1) {
      //   document.getElementById('dBestOversikt').style.display = 'none';
      // }
      this.number++;
      document.getElementById('utleie' + this.number).style.display = 'block';
      if (this.number == 3) {
        document.getElementById('nesteUtleie').innerHTML = 'Fullfør';
        document.getElementById('nesteUtleie').onclick = this.order;
      }
    }
  }
  prevPage() {
    if (this.number > 1) {
      document.getElementById('utleie' + this.number).style.display = 'none';
      // if (this.number == 3) {
      //   document.getElementById('dBestOversikt').style.display = 'block';
      // } else if (this.number != 3) {
      //   document.getElementById('dBestOversikt').style.display = 'none';
      // }
      this.number--;
      document.getElementById('utleie' + this.number).style.display = 'block';
      if (this.number != 3) {
        document.getElementById('nesteUtleie').innerHTML = 'Neste side';
        document.getElementById('nesteUtleie').onclick = this.nextPage;
      }
    }
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
