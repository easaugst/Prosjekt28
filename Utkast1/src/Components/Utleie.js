import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ValidatorForm } from 'react-form-validator-core';

import { sykkelService } from '../Services/Sykkel';
import { kundeService } from '../Services/Kunde';
import { utstyrService } from '../Services/Utstyr';
import { ansattService } from '../Services/Ansatt';
import { bestillingsService } from '../Services/Bestilling';
import { utleieService } from '../Services/Utleie';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table, TextValidator } from '../widgets';
import Select from 'react-dropdown-select'; //npm install react-dropdown-select
const history = createHashHistory();

export class Utleie extends Component {
  kunde = []; kundenr = ''; kundeDrop = [];
  utleieType = []; utleieTypeSykkel = []; utleieTypeUtstyr = []; utleieTyper = null;
  state = { values: [] };

  uType = '';
  kontant = '';
  ftid = '';
  ttid = '';
  gruppe = 'Enkel';
  detaljer = 'Ikke spesifisert';

  tilgjengeligeSykler = [];
  tilgjengeligUtstyr = []; tilgjengeligeBrett = 0;
  bId = '';
  runU = 0; runS = 0;
  sykkelType = ''; utstyrType = '';

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
              <Card>
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
                <input type="checkbox" id="gruppeInput" onChange={this.gruppeValg} />
                Gruppebestilling
                <br />
                <br />
                <label>Type leie</label>
                <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                  <option>Velg tid</option>
                  <option value="Timesleie">Timesutleie</option>
                  <option value="Dagsleie">Dagsutleie</option>
                  <option value="Tredagersleie">3-dagersutleie</option>
                  <option value="Ukesleie">Ukesleie</option>
                </select>
                <br />
                <label>Bestilling begynner</label>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={this.ftid}
                  onChange={event => (this.ftid = event.target.value)}
                />
                <br />
                <Row>
                  <Column>
                    <Button.Primary id="tilbake" onClick={this.prevPage}>
                      Tilbake
                    </Button.Primary>
                  </Column>
                  <Column>
                    <Button.Primary id="nesteUtleie" onClick={this.nextPage}>
                      Neste side
                    </Button.Primary>
                  </Column>
                </Row>
              </Card>
            </div>

            <div className="form-group" id="utleie2">
            <Card>
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
              <span className="leggTil">
              <Button.Info onClick={this.addSykkel}>Legg til sykkel</Button.Info>
              </span>
              <span className="fjernDet">
                <Button.Info onClick={this.removeSykkel}>Fjern sykkel</Button.Info>
              </span>
              <br />
              <br />
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
              <span className="leggTil">
              <Button.Info onClick={this.addUtstyr}>Legg til utstyr</Button.Info>
              </span>
              <span className="fjernDet">
                <Button.Info onClick={this.removeUtstyr}>Fjern utstyr</Button.Info>
              </span>{' '}
              <br />
              <Row>
                <Column>
                  <Button.Primary id="tilbake" onClick={this.prevPage}>
                    Tilbake
                  </Button.Primary>
                </Column>
                <Column>
                  <Button.Primary id="nesteUtleie" onClick={this.nextPage}>
                    Neste side
                  </Button.Primary>
                </Column>
              </Row>
              </Card>

            </div>
            <div className="form-group" id="utleie3">
            <Card>
            <label>Betalingmetode</label>
<br/>
              <input type="radio" name="betaling" id="kort" onChange={this.betalingValg} /> Kort <br />
              <input type="radio" name="betaling" id="kontant" onChange={this.betalingValg} /> Kontant
              <br />
              <br />
              <Row>
                <Column>
                  <Button.Primary id="tilbake" onClick={this.prevPage}>
                    Tilbake
                  </Button.Primary>
                </Column>
                <Column>
                  <Button.Success id="nesteUtleie" onClick={this.order}>
                    Fullfør bestilling
                  </Button.Success>
                </Column>
              </Row>
              </Card>
            </div>

            <br />
            <Button.Light onClick={this.log}>Logg Select</Button.Light>
          </form>
        </div>
        <div className="mainViewUtleie2" />
        <div id="dBestOversikt">

          <Table>
            <Table.Rad>
              <th>Sykkeltyper</th>
              <th>Antall</th>
              <th>Ledige</th>
            </Table.Rad>
            {this.utleieTypeSykkel.map(type => (
              <Table.Rad key={type.utid}>
                <td>{type.utnavn}</td>
                <td id={'antall' + type.utid} />
                <td id={'antallT' + type.utid}>(0)</td>
              </Table.Rad>
            ))}
          </Table>
          <Table>
            <Table.Rad>
              <th>Utstyrstyper</th>
              <th>Antall</th>
              <th>Ledige</th>
            </Table.Rad>
            {this.utleieTypeUtstyr.map(type => (
              <Table.Rad key={type.utid}>
                <td>{type.utnavn}</td>
                <td id={'antall' + type.utid} />
                <td id={'antallT' + type.utid}>(0)</td>
              </Table.Rad>
            ))}
          </Table>
        </div>
      </div>
    );
  }
  mounted() {
    document.getElementById('tilbake').style.display = 'none';
    window.scrollTo(0, 0);
    this.kundeDropDown();
    utleieService.getTyper(typer => {
      this.utleieType = typer;
    });

    utleieService.getSykkelTyper(typer => {
      this.utleieTypeSykkel = typer;
    });

    utleieService.getUtstyrTyper(typer => {
      this.utleieTypeUtstyr = typer;
    });

    utleieService.countTyper(typer => {
      this.utleieTyper = parseInt(typer.substr(typer.lastIndexOf(':') + 1));
      console.log(this.utleieTyper);
    });

    utleieService.tilgjengeligeSykler(tilgjengelig => {
      tilgjengelig.map(sykler => {
        document.getElementById('antallT' + sykler.sykkeltypeid).innerHTML = '(' + sykler.tilgjengelig + ')';
        this.tilgjengeligeSykler[sykler.sykkeltypeid] = sykler.tilgjengelig;
      });
      console.log(this.tilgjengeligeSykler);
    });

    utleieService.tilgjengeligUtstyr(tilgjengelig => {
      tilgjengelig.map(utstyr => {
        document.getElementById('antallT' + utstyr.utstyrstypeid).innerHTML = '(' + utstyr.tilgjengelig + ')';
        this.tilgjengeligUtstyr[utstyr.utstyrstypeid] = utstyr.tilgjengelig;
      });
      console.log(this.tilgjengeligUtstyr);
    });
  }
  log() {}

  order() {
    //Sjekker om det er tilstrekkelig med tilgjengelige sykler og utstyr på lager
    //Overbestilling opprettes
    if (this.gruppe == 'Gruppe' && this.sykler.length == 1) {
      alert('For få sykler for gruppebestilling');
    } else {
      this.sykler.sort();
      this.utstyr.sort();

      this.ttid = new Date(Date.parse(this.ftid));
      switch (this.uType) {
        case 'Timesleie':
          this.ttid.setHours(this.ttid.getHours() + 1);
          break;
        case 'Dagsleie':
          this.ttid.setDate(this.ttid.getDate() + 1);
          break;
        case 'Tredagersleie':
          this.ttid.setDate(this.ttid.getDate() + 3);
          break;
        case 'Ukesleie':
          this.ttid.setDate(this.ttid.getDate() + 7);
          break;
      }
      this.ttid =
        this.ttid.getFullYear() +
        '-' +
        ('00' + (this.ttid.getMonth() + 1)).slice(-2) +
        '-' +
        ('00' + this.ttid.getDate()).slice(-2) +
        ' ' +
        ('00' + this.ttid.getHours()).slice(-2) +
        ':' +
        ('00' + this.ttid.getMinutes()).slice(-2) +
        ':' +
        ('00' + this.ttid.getSeconds()).slice(-2);
      console.log(this.ttid);

      utleieService.addBestilling(
        this.state.values[0].key,
        window.ansatt,
        this.uType,
        this.kontant,
        this.ftid,
        this.ttid,
        this.gruppe,
        () => {
          console.log(this.state.values[0].key, this.uType, this.kontant, this.ftid, this.ttid, this.gruppe);
          utleieService.getBestilling(bestilling => {
            this.bId = parseInt(bestilling.substr(bestilling.lastIndexOf(':') + 1));
            console.log('Bestillingsid: ' + this.bId);
            this.registrerSykkel();
            this.registrerUtstyr();
          });
          history.push('/oversikt/bestilling/');
        }
      );
    }
  }
  registrerSykkel() {
    //Delbestillinger for sykler opprettes
    this.vSykler = [];
    for (var i = 0; i < this.utleieTyper; i++) {
      if (this.sykler.includes(i) == true && this.sTyper.includes(i) == false) {
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
      utleieService.addUBestillingSykkel(this.vSykler[k].regnr, this.bId, results => {});
      utleieService.updateSykkel(this.vSykler[k].regnr, 'Utleid', () => {});
      console.log('Underbestilling for sykkel ' + this.vSykler[k].regnr + ' lagt til');
    }
  }
  registrerUtstyr() {
    //Delbestillinger for utstyr opprettes
    this.vUtstyr = [];
    for (var i = 0; i < this.utleieTyper; i++) {
      if (this.utstyr.includes(i) == true && this.uTyper.includes(i) == false) {
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
      utleieService.addUBestillingUtstyr(this.vUtstyr[k].utstyrsid, this.bId, results => {});
      utleieService.updateUtstyr(this.vUtstyr[k].utstyrsid, 'Utleid', () => {});
      console.log('Underbestilling for utstyr ' + this.vUtstyr[k].utstyrsid + ' lagt til');
    }
  }

  teller(array, char) {
    if (array.includes(char)) {
      return array.lastIndexOf(char) - array.indexOf(char) + 1;
    } else {
      return 0;
    }
  }

  kundeDropDown() {
    utleieService.getDropdown(kundenr => {
      this.kunde = JSON.parse(kundenr);
    });

    this.kundeDrop = [];
    this.kunde.map(kunde => {
      this.kundeDrop.push({ key: parseInt(kunde.kundenr), text: kunde.fnavn + ' ' + kunde.enavn + ' - ' + kunde.kundenr });
    });
    this.t++;
    console.log(this.kundeDrop);
  }
  addSykkel() {
    if (
      document.getElementById('antall' + this.sykkelType).innerHTML <
      this.tilgjengeligeSykler[parseInt(this.sykkelType)]
    ) {
      this.sykler.push(parseInt(this.sykkelType));
      this.sykler.sort();
      console.log(this.sykler);
      document.getElementById('antall' + this.sykkelType).innerHTML = this.teller(this.sykler, parseInt(this.sykkelType));
    } else {
      alert('Ikke flere tilgjengelige sykler av denne typen');
    }
    this.sjekkBagasjebrett();
  }
  removeSykkel(){
    this.sykler.splice(this.sykler.lastIndexOf(parseInt(this.sykkelType)), 1);
    if (document.getElementById('antall' + this.sykkelType).innerHTML === '1' || document.getElementById('antall' + this.sykkelType).innerHTML === '') {
      document.getElementById('antall' + this.sykkelType).innerHTML = '';
    } else {
      document.getElementById('antall' + this.sykkelType).innerHTML = this.teller(this.sykler, parseInt(this.sykkelType));
    }
    console.log(this.sykler);
  }
  addUtstyr() {
    console.log(this.tilgjengeligeBrett);
    if (parseInt(this.utstyrType) == 6 && this.teller(this.utstyr, parseInt(this.utstyrType)) >= this.tilgjengeligeBrett) {
      alert('Ikke nok sykler med bagasjebrett');
    } else if (document.getElementById('antall' + this.utstyrType).innerHTML < this.tilgjengeligUtstyr[parseInt(this.utstyrType)]) {
      this.utstyr.push(parseInt(this.utstyrType));
      this.sykler.sort();
      console.log(this.utstyr);
      document.getElementById('antall' + this.utstyrType).innerHTML = this.teller(this.utstyr, parseInt(this.utstyrType));
    } else {
      alert('Ikke mer utstyr av denne typen tilgjengelig');
    }
  }
  removeUtstyr(){
    this.utstyr.splice(this.utstyr.lastIndexOf(parseInt(this.utstyrType)), 1);
    if (document.getElementById('antall' + this.utstyrType).innerHTML === '1' || document.getElementById('antall' + this.utstyrType).innerHTML === '') {
      document.getElementById('antall' + this.utstyrType).innerHTML = '';
    } else {
      document.getElementById('antall' + this.utstyrType).innerHTML = this.teller(this.utstyr, parseInt(this.utstyrType));
    }
    console.log(this.utstyr);
  }
  nextPage() {
    if (this.number < 3) {
      console.log(this.number);
      document.getElementById('tilbake').style.display = 'block';
      document.getElementById('utleie' + this.number).style.display = 'none';
      this.number++;
      document.getElementById('utleie' + this.number).style.display = 'block';
      if (this.number == 3) {
        document.getElementById('nesteUtleie').innerHTML = 'Fullfør';
        document.getElementById('nesteUtleie').onclick = this.order;
      }
      console.log(this.number);
    }
  }
  prevPage() {
    if (this.number == 2) {
      document.getElementById('tilbake').style.display = 'none';
    }
    if (this.number > 1) {
      console.log(this.number);
      document.getElementById('utleie' + this.number).style.display = 'none';
      this.number--;
      document.getElementById('utleie' + this.number).style.display = 'block';
      if (this.number != 3) {
        document.getElementById('nesteUtleie').innerHTML = 'Neste side';
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
  sjekkBagasjebrett() {
    utleieService.sjekkBagasjebrett(brett => {
      this.tilgjengeligeBrett = 0;
      brett.map(brett => {
        this.tilgjengeligeBrett += this.teller(this.sykler, brett.utid);
      });
      console.log('Tilgjengelige bagasjebrett: ' + this.tilgjengeligeBrett);
    });
  }
}
export class UtleieVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/utleie">
          <ion-icon name="create" />
          Legg inn bestilling
        </NavCol.Link>
        <NavCol.Link to="/utleie/kundereg">
          <ion-icon name="person-add" />
          Registrer kunde
        </NavCol.Link>
        <NavCol.Link to="/utleie/levering">
          <ion-icon name="archive" />
          Lever sykkel/utstyr
        </NavCol.Link>
      </NavCol>
    );
  }
}
