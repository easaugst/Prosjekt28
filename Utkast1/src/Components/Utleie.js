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
  utleieTyper = null;

  uType = '';
  kontant = '';
  ftid = '';
  gruppe = '';
  detaljer = 'Ikke spesifisert';

  bId = '';
  sykkelType = ''; sykkelTypeText = '';
  utstyrType = ''; utstyrTypeText = '';

  sykler = []; tSykler = []; vSykler = []; sTyper = [];
  utstyr = []; tUtstyr = []; vUtstyr = []; uTyper = [];

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
                <option value="12">Downhillsykkel</option>
                <option value="13">Racersykkel</option>
                <option value="14">Barnesykkel</option>
              </select>
              <Button.Light onClick={this.addSykkel}>Legg til sykkel</Button.Light>
              <label>Utstyr</label>
              <select className="form-control" onChange={event => (this.utstyrType = event.target.value)}>
                <option>Ingen</option>
                <option value="4">Hjelm</option>
                <option value="5">Lappesett</option>
                <option value="6">Sykkelveske</option>
                <option value="7">Barnesete</option>
                <option value="8">Barnehenger</option>
                <option value="9">Lastehenger</option>
                <option value="10">Beskytter</option>
                <option value="11">Lås</option>
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
              <td id="antallSykler1" />
              <td id="antallSykler2" />
              <td id="antallSykler3" />
              <td id="antallSykler" />
            </Table.Rad>
          </Table>
          <Table>
            <Table.Rad>
              <th>Hjelm</th>
              <th>Lappesett</th>
              <th>Totalt</th>
            </Table.Rad>
            <Table.Rad>
              <td id="antallUtstyr4" />
              <td id="antallUtstyr5" />
              <td id="antallUtstyr" />
            </Table.Rad>
          </Table>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.kundeDropDown();
    utleieService.getTyper(typer => {
      this.utleieTyper = parseInt(typer.substr(typer.lastIndexOf(':') + 1));
      console.log(this.utleieTyper);
    });
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
    utleieService.getBestilling(bestilling => {
      this.bId = parseInt(bestilling.substr(bestilling.lastIndexOf(':') + 1));
      console.log(this.bId);
    });
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
    // document.getElementById('antallSykler' + this.sykkelType).innerHTML =
    //   this.sykler.sort().lastIndexOf(parseInt(this.sykkelType)) -
    //   this.sykler.sort().indexOf(parseInt(this.sykkelType)) +
    //   1;
    document.getElementById('antallSykler').innerHTML = this.sykler.length;
  }
  addUtstyr() {
    this.utstyr.push(parseInt(this.utstyrType));
    console.log(this.utstyr);
    // document.getElementById('antallUtstyr' + this.utstyrType).innerHTML =
    //   this.utstyr.sort().lastIndexOf(parseInt(this.utstyrType)) -
    //   this.utstyr.sort().indexOf(parseInt(this.utstyrType)) +
    //   1;
    document.getElementById('antallUtstyr').innerHTML = this.utstyr.length;
  }
  order() {
    //Sjekker om det er tilstrekkelig med tilgjengelige sykler og utstyr på lager
  //Overbestilling opprettes
    this.sykler.sort();
    this.utstyr.sort();
    utleieService.addBestilling(this.state.values[0].key, this.uType, this.kontant, this.ftid, this.gruppe, () => {
      console.log(this.state.values[0].key, this.uType, this.kontant, this.ftid, this.gruppe);
      utleieService.getBestilling(bestilling => {
        this.bId = parseInt(bestilling.substr(bestilling.lastIndexOf(':') + 1));
        console.log('Bestillingsid: ' + this.bId);
      });
      this.registrerSykkel();
      this.registrerUtstyr();
    });
  }
  registrerSykkel() {
    //Delbestillinger for sykler opprettes
    this.vSykler = [];
    for (var i = 0; i <= this.utleieTyper; i++) {
      if (this.sykler.includes(i) == true && this.sTyper.includes(i) == false) {
        this.sTyper.push(i);
      }
    }
    console.log(this.sTyper);
    for (var i = 0; i < this.sTyper.length; i++) {
      console.log(this.sykler);
      console.log(
        'antall: ' + (this.sykler.lastIndexOf(this.sTyper[i]) - this.sykler.indexOf(this.sTyper[i]) + 1),
        'type: ' + this.sTyper[i]
      );

      utleieService.getSykler(this.sTyper[i], (this.sykler.lastIndexOf(this.sTyper[i]) - this.sykler.indexOf(this.sTyper[i]) + 1), tSykler => {
        this.tSykler.push(tSykler);
        console.log('Svar fra database, del 1 kjørt | Kjøring' + (i), this.tSykler);
        this.tSykler[0].map(sykkel => {
          this.vSykler.push(sykkel.regnr);
        });
        console.log('Del 2 kjørt | Kjøring' + (i), this.vSykler);
        this.tSykler = [];
        console.log('Valgte sykler: ' + this.vSykler);
        for (var j = 0; j < this.vSykler.length; j++) {
          utleieService.addUBestillingSykkel(this.vSykler[j], this.bId, () => {
            console.log('Sykkel ' + this.vSykler[j] + ' registrert');
          });
          utleieService.updateSykkel(this.vSykler[j], 'Bestilt', () => {
            console.log('Sykkel ' + this.vSykler[j] + ' Oppdatert');
          });
        }
      });
    }
  }
  registrerUtstyr() {
    //Delbestillinger for utstyr opprettes
    this.vUtstyr = [];
    for (var i = 0; i <= this.utleieTyper; i++) {
      if (this.utstyr.includes(i) == true && this.uTyper.includes(i) == false) {
        this.uTyper.push(i);
      }
    }
    console.log(this.uTyper);
    for (var i = 0; i < this.uTyper.length; i++) {
      console.log(this.utstyr);
      console.log(
        'antall: ' + (this.utstyr.lastIndexOf(this.uTyper[i]) - this.utstyr.indexOf(this.uTyper[i]) + 1),
        'type: ' + this.uTyper[i]
      );

      utleieService.getUtstyr(this.uTyper[i], (this.utstyr.lastIndexOf(this.uTyper[i]) - this.utstyr.indexOf(this.uTyper[i]) + 1), tUtstyr => {
        this.tUtstyr.push(tUtstyr);
        console.log('Svar fra database, del 1 kjørt | Kjøring' + (i), this.tUtstyr);

        this.tUtstyr[0].map(utstyr => {
          this.vUtstyr.push(utstyr.utstyrsid);
        });
        
        utleieService.addUBestillingUtstyr(this.vUtstyr[j], this.bId, () => {
          console.log('Utstyr ' + this.vUtstyr[j] + ' registrert');

        });
        console.log('Del 2 kjørt | Kjøring' + (i), this.vUtstyr);
        this.tUtstyr = [];
        console.log('Valgt utstyr:' + this.vUtstyr);
        for (var j = 0; j < this.vUtstyr.length; j++) {
      });
    }
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
