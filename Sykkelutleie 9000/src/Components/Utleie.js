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
  utleiested = 'Rallarvegen';

  uType = '';
  kontant = '';
  minTid = ''; ftid = '';
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
            <h1> Ny bestilling </h1>
              <Card title="Bestillingsinformasjon">
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
                <label>Utleiested</label>
                <Form.Input
                  type="text"
                  placeholder="Rallarvegen"
                  value={this.utleiested}
                  onChange={event => (this.utleiested = event.target.value)}
                />
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
                  min={this.minTid}
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
            <Card title="Bestillingsinformasjon">
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
                <option>Velg utstyr</option>
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
            <Card title="Bestillingsinformasjon">
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
    var d = new Date();
      d.setHours(d.getHours() + 2);
        this.ftid = JSON.stringify(d).replace(/Z/g, ' ').replace(/"/g, '').slice(0, -8);
        this.minTid = JSON.stringify(d).replace(/Z/g, ' ').replace(/"/g, '').slice(0, -8);

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

  order() {
    //Sjekker om det er tilstrekkelig med tilgjengelige sykler og utstyr på lager
    //Overbestilling opprettes
    if (this.gruppe == 'Gruppe' && this.sykler.length == 1) {
      alert('For få sykler for gruppebestilling');
    } else if(this.kontant === '') {
      alert('Du har ikke valgt betalingsmetode');
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
        this.utleiested,
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
            this.registrerSykkel();   //Registrerer syklene som skal leies ut
            this.registrerUtstyr();   //Registrerer utstyret som skal leies ut
          });
          history.push('/oversikt/bestilling/');
        }
      );
    }
  }
  registrerSykkel() {   //Registrerer syklene som leies ut
    this.vSykler = [];
    for (var i = 0; i <= this.utleieTyper; i++) {
      if (this.sykler.includes(i) == true && this.sTyper.includes(i) == false) {
        this.sTyper.push(i);    //Legger til utstyrstype i array hvis det er i this.sykler og ikke er lagt til tidligere
      }
    }
    console.log(this.sTyper);

    for (var j = 0; j < this.sTyper.length; j++) {    //Kjører for alle gjenstander i this.sTyper
      console.log('antall: ' + this.teller(this.sykler, this.sTyper[j]), 'type: ' + this.sTyper[j]);

      utleieService.getSykler(this.sTyper[j], this.teller(this.sykler, this.sTyper[j]), tSykler => {    //Henter antallet sykler av sykkeltypene lagt inn i this.sTyper
        tSykler.map(sykler => {
          this.vSykler.push({ regnr: sykler.regnr });   //Legger tilgjengelige sykler hentet fra databasen inn i this.vSykler
        });
        this.runS++;
        this.bestillSykler();   //Oppretter delbestillinger og markerer syklene i disse
        console.log('Svar fra database, del 1 kjører!! ' + j, this.vSykler, this.sTyper.length);
      });
    }
    console.log('Program slutt');
  }
  bestillSykler() {   //Oppretter delbestillinger og markerer syklene i disse
    for (var k = 0; k < this.vSykler.length && this.runS == this.sTyper.length; k++) {
      utleieService.addUBestillingSykkel(this.vSykler[k].regnr, this.bId, results => {});   //Oppretter delbestillinger
      utleieService.updateSykkel(this.vSykler[k].regnr, 'Utleid', () => {});    //Markerer syklene
      console.log('Underbestilling for sykkel ' + this.vSykler[k].regnr + ' lagt til');
    }
  }
  registrerUtstyr() {   //Registrerer utstyret som skal leies ut. Fungerer slik som registrerSykkel
    this.vUtstyr = [];
    for (var i = 0; i <= this.utleieTyper; i++) {
      if (this.utstyr.includes(i) == true && this.uTyper.includes(i) == false) {
        this.uTyper.push(i);
      }
    }
    console.log(this.uTyper);

    for (var j = 0; j < this.uTyper.length; j++) {    //Kjører en gang for hver utstyrstype det er valgt en eller flere enheter av
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
  bestillUtstyr() {   //Bestiller utstyret som har blitt valgt i this.utstyr
    for (var k = 0; k < this.vUtstyr.length && this.runU == this.uTyper.length; k++) {
      utleieService.addUBestillingUtstyr(this.vUtstyr[k].utstyrsid, this.bId, results => {});   //Lager en ny delbestilling med valg utstyr
      utleieService.updateUtstyr(this.vUtstyr[k].utstyrsid, 'Utleid', () => {});    //Oppdaterer status på utstyret
      console.log('Underbestilling for utstyr ' + this.vUtstyr[k].utstyrsid + ' lagt til');
    }
  }

  teller(array, char) {   //Teller antall gjenstander (char) i et array (array).
    array.sort();
    if (array.includes(char)) {
      return array.lastIndexOf(char) - array.indexOf(char) + 1;
    } else {
      return 0;
    }
  }

  kundeDropDown() {   //Henter kunder fra databasen og legger dem inn i kundeDrop som nye objekt
    utleieService.getDropdown(kundenr => {
      this.kunde = JSON.parse(kundenr);
    });

    this.kundeDrop = [];    //Tømmer array slik at vi ikke får dobbelt opp med kunder
    this.kunde.map(kunde => {   //.map(...) kjører gjennom hele arrayet
      this.kundeDrop.push({ key: parseInt(kunde.kundenr), text: kunde.fnavn + ' ' + kunde.enavn + ' - ' + kunde.kundenr });
    });
    console.log(this.kundeDrop);
  }
  addSykkel() {   //Legger til ny sykkel i array this.sykler
    if (document.getElementById('antall' + this.sykkelType).innerHTML < this.tilgjengeligeSykler[parseInt(this.sykkelType)]) {
      this.sykler.push(parseInt(this.sykkelType));    //En sykkel markeres kun med sykkeltypeid. Det er typen som pushes inn i array
      console.log(this.sykler);
      document.getElementById('antall' + this.sykkelType).innerHTML = this.teller(this.sykler, parseInt(this.sykkelType));    //Viser antall valgte sykler for brukeren
    } else {
      alert('Ikke flere tilgjengelige sykler av denne typen');
    }
    this.sjekkBagasjebrett();
  }
  removeSykkel(){   //Fjerner tidligere valgt sykkel fra this.sykler
    this.sykler.splice(this.sykler.lastIndexOf(parseInt(this.sykkelType)), 1);    //Fjerner siste gjenstand av spesifisert sykkeltype i array
    if (document.getElementById('antall' + this.sykkelType).innerHTML === '1' || document.getElementById('antall' + this.sykkelType).innerHTML === '') {
      document.getElementById('antall' + this.sykkelType).innerHTML = '';   //Tømmer celle som teller antall valgt av typen i tabellen dersom det ikke lenger vil være flere av denne typen valgt
    } else {
      document.getElementById('antall' + this.sykkelType).innerHTML = this.teller(this.sykler, parseInt(this.sykkelType));
    }
    console.log(this.sykler);
  }
  addUtstyr() {   //Legger til nytt utstyr i array this.sykler. Fungerer likt som addSykkel unntatt første if-setning
    console.log(this.tilgjengeligeBrett);
    //Sjekker om brukeren prøver å legge til sykkelveske (Dette krever bagasjebrett, noe som blir sjekket hver gang en sykkel legges til)
    if (parseInt(this.utstyrType) == 6 && this.teller(this.utstyr, parseInt(this.utstyrType)) >= this.tilgjengeligeBrett) {
      alert('Ikke nok sykler med bagasjebrett');
    } else if (document.getElementById('antall' + this.utstyrType).innerHTML < this.tilgjengeligUtstyr[parseInt(this.utstyrType)]) {
      this.utstyr.push(parseInt(this.utstyrType));
      console.log(this.utstyr);
      document.getElementById('antall' + this.utstyrType).innerHTML = this.teller(this.utstyr, parseInt(this.utstyrType));
    } else {
      alert('Ikke mer utstyr av denne typen tilgjengelig');
    }
  }
  removeUtstyr(){   //Fjerner tidligere valgt utstyr fra this.utstyr. Fungerer likt som removeSykkel
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
  gruppeValg() {    //Sjeker om checkboxen for gruppe er huket av. Definerer verdi utfra dette
    if (document.getElementById('gruppeInput').checked == true) {
      this.gruppe = 'Gruppe';
    } else {
      this.gruppe = 'Enkel';
    }
  }
  betalingValg() {    //Sjekker hvilken radioknapp som er valgt. Definerer verdi utfra dette
    if (document.getElementById('kort').checked == true) {
      this.kontant = 'Kort';
    } else if (document.getElementById('kontant').checked == true) {
      this.kontant = 'Kontant';
    }
  }
  sjekkBagasjebrett() {   //Sjekker hvilke sykkeltyper som har bagasjebrett og teller så hvor mange av de valgte syklene som er av disse typene
    utleieService.sjekkBagasjebrett(brett => {
      this.tilgjengeligeBrett = 0;
      brett.map(brett => {    //Kjører gjennom alle svarene fra databasen
        this.tilgjengeligeBrett += this.teller(this.sykler, brett.utid);    //Teller hvor mange sykler i this.sykler som har bagasjebrett og legger det til i tligjengeligeBrett
      });
      console.log('Tilgjengelige bagasjebrett: ' + this.tilgjengeligeBrett);
    });
  }
}
export class UtleieVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/utleie/utleie">
          <ion-icon name="create" />
          Legg inn bestilling
        </NavCol.Link>
      </NavCol>
    );
  }
}
