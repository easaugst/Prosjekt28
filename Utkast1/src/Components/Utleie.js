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
  utleieType = [];
  utleieTyper = null;

  uType = '';
  kontant = '';
  ftid = '';
  gruppe = 'Enkel';
  detaljer = 'Ikke spesifisert';

  bId = ''; runU = 0; runS = 0;
  sykkelType = ''; sykkelTypeText = '';
  utstyrType = ''; utstyrTypeText = '';

  sykler = []; vSykler = []; sTyper = [];
  utstyr = []; vUtstyr = []; uTyper = [];

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
                id="gruppeInput"
                onChange={this.gruppeValg}
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
              <input type="radio" name="betaling" id="kort" onChange={this.betalingValg} /> Kort <br />
              <input type="radio" name="betaling" id="kontant" onChange={this.betalingValg} /> Kontant
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
          {this.utleieType.map(type => (
            <Table.Rad key={type.utid}>
              <th>{type.utnavn}</th>
              <td id={'antall' + type.utid} />
            </Table.Rad>
          ))}
          </Table>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.kundeDropDown();
    utleieService.countTyper(typer => {
      this.utleieTyper = parseInt(typer.substr(typer.lastIndexOf(':') + 1));
      console.log(this.utleieTyper);
    });
  }
  mounted() {
    utleieService.getTyper(typer => {
      this.utleieType = typer;
    })
  }
  log() {
    console.log(this.kontant);
  }

  order() {
    //Sjekker om det er tilstrekkelig med tilgjengelige sykler og utstyr på lager
  //Overbestilling opprettes
    this.sykler.sort();
    this.utstyr.sort();
    utleieService.addBestilling(this.state.values[0].key, window.ansatt, this.uType, this.kontant, this.ftid, this.gruppe, () => {
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
      for (var i = 0; i < this.utleieTyper; i++) {
        if ((this.sykler.includes(i) == true) && (this.sTyper.includes(i) == false)) {
          this.sTyper.push(i);
        } //If-setningen kjører som den skal
      } //Løkken kjører som den skal
      console.log(this.sTyper);

      for (var j = 0; j < this.sTyper.length; j++) {
        console.log('antall: ' + this.teller(this.sykler, this.sTyper[j]), 'type: ' + this.sTyper[j]);

        utleieService.getSykler(this.sTyper[j], this.teller(this.sykler, this.sTyper[j]), tSykler => {
          tSykler.map(sykler => {
            this.vSykler.push({ regnr: sykler.regnr });
          });
          this.runS++;
          this.bestillSykler();
          console.log('Svar fra database, del 1 kjører!! ' + j, this.vSykler, this.sTyper.length);
        });
      }

      /*
      Løkken venter ikke på svar fra databasen før den kjører ny runde. Når databasen til slutt svarer, har den feil verdi for j i kjøringen til
      ( "success" ). Spørringen gir fortsatt riktig svar fra databasen.
      */
      console.log('Program slutt');
    }
      bestillSykler() {
        for (var k = 0; k < this.vSykler.length && this.runS == this.sTyper.length; k++) {
          utleieService.addUBestillingSykkel(this.vSykler[k].regnr, this.bId, results => {
          });
          utleieService.updateSykkel(this.vSykler[k].regnr, "Utleid", () => {
          });
          console.log('Underbestilling for sykkel ' + this.vSykler[k].regnr + ' lagt til');
        }
      }
    registrerUtstyr() {
      //Delbestillinger for utstyr opprettes
      this.vUtstyr = [];
      for (var i = 0; i < this.utleieTyper; i++) {
        if ((this.utstyr.includes(i) == true) && (this.uTyper.includes(i) == false)) {
          this.uTyper.push(i);
        } //If-setningen kjører som den skal
      } //Løkken kjører som den skal
      console.log(this.uTyper);

      for (var j = 0; j < this.uTyper.length; j++) {
        console.log('antall: ' + this.teller(this.utstyr, this.uTyper[j]), 'type: ' + this.uTyper[j]);

        utleieService.getUtstyr(this.uTyper[j], this.teller(this.utstyr, this.uTyper[j]), tUtstyr => {
          tUtstyr.map(utstyr => {
            this.vUtstyr.push({ utstyrsid: utstyr.utstyrsid });
          });
          this.runU++;
          this.bestillUtstyr();
          console.log('Svar fra database, del 1 kjører!! ' + j, this.vUtstyr, this.uTyper.length);
        });
      }
      console.log('Program slutt');
    }
      bestillUtstyr() {
        for (var k = 0; k < this.vUtstyr.length && this.runU == this.uTyper.length; k++) {
          utleieService.addUBestillingUtstyr(this.vUtstyr[k].utstyrsid, this.bId, results => {
          });
          utleieService.updateUtstyr(this.vUtstyr[k].utstyrsid, "Utleid", () => {
          });
          console.log('Underbestilling for utstyr ' + this.vUtstyr[k].utstyrsid + ' lagt til');
        }
      }

  teller(array, char) {
   return (array.lastIndexOf(char) - array.indexOf(char) + 1)
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
    this.sykler.sort();
    console.log(this.sykler);
    document.getElementById('antall' + this.sykkelType).innerHTML = this.teller(this.sykler, parseInt(this.sykkelType));
  }
  addUtstyr() {
    this.utstyr.push(parseInt(this.utstyrType));
    this.sykler.sort();
    console.log(this.utstyr);
    document.getElementById('antall' + this.utstyrType).innerHTML = this.teller(this.utstyr, parseInt(this.utstyrType));
  }
  nextPage() {
    if (this.number < 3) {
      console.log(this.number);
      document.getElementById('utleie' + this.number).style.display = 'none';
      this.number++;
      document.getElementById('utleie' + this.number).style.display = 'block';
      if (this.number == 3) {
        document.getElementById('nesteUtleie').innerHTML = 'Fullfør';
        document.getElementById('nesteUtleie').onClick = this.order;
      }
      console.log(this.number);
    }
  }
  prevPage() {
    if (this.number > 1) {
      console.log(this.number);
      document.getElementById('utleie' + this.number).style.display = 'none';
      this.number--;
      document.getElementById('utleie' + this.number).style.display = 'block';
      if (this.number != 3) {
        document.getElementById('nesteUtleie').innerHTML = 'Neste side <ion-icon name="arrow-forward" />';
        document.getElementById('nesteUtleie').onClick = this.nextPage;
      }
      console.log(this.number);
    }
  }
  gruppeValg() {
    if (document.getElementById('gruppeInput').checked == true) {
      this.gruppe = 'Gruppe';
    } else {
      this.gruppe = 'Enkel';
    }
  }
  betalingValg() {
    if (document.getElementById('kort').checked == true) {
      this.kontant = 'Kort';
    } else if (document.getElementById('kontant').checked == true) {
      this.kontant = 'Kontant';
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
