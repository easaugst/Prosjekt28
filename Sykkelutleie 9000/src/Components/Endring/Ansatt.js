import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ansattService } from '../../Services/Ansatt';
import { bestillingsService } from '../../Services/Bestilling';
import { kundeService } from '../../Services/Kunde';
import { sykkelService } from '../../Services/Sykkel';
import { utleieService } from '../../Services/Utleie';
import { utstyrService } from '../../Services/Utstyr';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../../widgets';
const history = createHashHistory();

export class AnsattEndring extends Component {
  aArray = [];    //Inneholder ansatte hentet fra databasen. Brukes for .map() av tabell

  //sideMengde, sider, aktivSide og sisteSide brukes til å dele tabelloversikten inn i flere sider. 'sider' brukes for .map() av sidene
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  ansatte = null;   //Antall ansatte lagres her. Brukes til å dele tabelloversikten inn i flere sider

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrér:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
      {/*
        this.sider.map(...) deler tabellen inn i sider som inneholder deler av tabelloversikten.
        Sidene er <div> element som skjules og vises av knappene for sidebytte.
        */}
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
                <th>Ansatt</th>
                <th>Telefon</th>
                <th>Epost</th>
                <th>Fornavn</th>
                <th>Etternavn</th>
                <th>Administrator</th>
                <th>Arbeidsplass</th>
                <th>Stilling</th>
                <th>Rediger</th>
              </Table.Rad>
              {/*
                this.aArray.slice(...) henter ut kun ønskede gjenstander i aArray, et utklipp av aArray. Dette antallet er basert på verdiene lagret i
                objektene i this.sider, tidligere definert som mengde (this.sider.map(mengde => ...)).
                Utklippet brukes til å hente ut informasjon om disse ansatte på samme måte som i oversikt
                */}
              {this.aArray.slice(mengde.forrigeSide, mengde.sideMengde).map(ansatt => (
                <Table.Rad key={ansatt.ansattnr}>
                  <td>{ansatt.ansattnr}</td>
                  <td>{ansatt.tlfnr}</td>
                  <td>{ansatt.epost}</td>
                  <td>{ansatt.fnavn}</td>
                  <td>{ansatt.enavn}</td>
                  <td>{ansatt.admin}</td>
                  <td>{ansatt.utleienavn}</td>
                  <td>{ansatt.stilling}</td>
                  <td>
                    <List.Item to={'/endring/ansatt/' + ansatt.ansattnr}>Rediger</List.Item>
                  </td>
                </Table.Rad>
              ))}
            </Table>
          </div>
        ))}
      </div>
    );
  }
  mounted() {   //Kjører når komponenten først hentes ut
    window.scrollTo(0, 0);    //Blar til toppen av siden
    ansattService.countAnsatt(ansatte => {
      this.ansatte = parseInt(ansatte.substr(ansatte.lastIndexOf(':') + 1));
      console.log(this.ansatte);
      this.ansattSortering();   //Kjører først etter svar fra databasen
    });
    ansattService.getAnsatt(ansatt => {   //Henter alle ansatte og legger det inn i aArray
      this.aArray = ansatt;
    });
  }
  filter() {    //Filtrerer oversikten over ansatte basert på brukers input. Her filtrerer den etter navn
    var tekst = document.getElementById('input').value;   //Definerer variablen tekst lik det bruker har skrevet inn i søkefelt
    tekst = "%" + tekst + "%";                            //Endrer strengen slik at den har % foran og bak (for bruk i sql setning)
      ansattService.getAnsattFilt(tekst, ansattF => {     //Kaller på funksjon for databasekall i ansattService (Service/Ansatt: Linje 11)
        this.aArray = ansattF;                            //Endrer innholdet i aArray til data fått fra databasen i filterkallet
      });
    this.pageSwitchH();   //Endrer aktivSide til den første siden slik at bruker kan se søkeresultatet best mulig
    this.forceUpdate();   //Tvinger en oppdatering av render()
  }
  pageSwitch(retning) {   //Bytter aktiv side i tabelloversikten basert på retning (this.aktivSide + 1 || this.aktivSide - 1)
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';   //Skjuler den aktive side
    document.getElementById('side' + this.sider[retning].sideMengde).style.display = 'block';   //Viser den nye siden

  }
    pageSwitchN() {   //Går til neste side i tabelloversikten
      if (this.aktivSide < this.sider.length - 1) {   //Kjører kun hvis aktivSide ikke er like stor eller større enn lengden av this.sider etter kjøring
        this.pageSwitch(this.aktivSide + 1)   //Retning + 1
        this.aktivSide++;
      }
    }
    pageSwitchP() {   //Går til forrige side i tabelloversikten
      if (this.aktivSide > 0) {   //Kjører kun hvis aktivSide ikke blir mindre
        this.pageSwitch(this.aktivSide - 1);    //Retning - 1
        this.aktivSide--;
      }
    }
    pageSwitchH() {   //Går til første side i tabelloversikten
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
      this.aktivSide = 0;
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
    }
    pageSwitchL() {   //Går til siste side i tabelloversikten
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
      this.aktivSide = this.sider.length - 1;
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
    }

  ansattSortering() {   //Lager "reglene" for sideinndeling
    if (this.ansatte > this.sideMengde) {   //Sjekker om det er nødvendig å dele inn i sider. Er det for mange ansatte til 1 side?
      this.sisteSide = this.ansatte % this.sideMengde;    //Henter restverdi som skal brukes til siste side
      this.ansatte -= this.sisteSide;   //Trekker fra restverdien i this.ansatte
      console.log(this.ansatte, this.sisteSide);
    }
    for (var i = 1; i <= (this.ansatte / this.sideMengde + 1); i++) {   //Kjører til i er større enn antall ansatte delt på sidemengde + 1
      if (i == (this.ansatte / this.sideMengde + 1)) {    //Når dette er sant, så har alle sidene bortsett fra siste side blitt definert i this.sider
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });    //Definerer siste side i this.sider
        console.log('Siste side: ' + this.sisteSide);
      } else {    //Hvis i != (this.ansatte / this.sideMengde + 1)
        if (this.sider.length == 0) {   //Når dette er sant, har ingen sider blitt definert enda
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });   //Definerer første side
          console.log('Første side opprettet:', this.sider[0]);
        } else {    //Hvis this.sider.length != 0
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde })    //Definerer sider
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';    //Viser første side, alle andre er skjult
  }
}

export class AnsattEndringMeny extends Component {
  ansattnr = '';
  ansatt = [];
  tlfnr = '';
  epost = '';
  fnavn = '';
  enavn = '';
  utleienavn = '';

  render() {
    return (
      <div>
        <div className="mainView">
          {/*
            Henter ut informasjon om den valgte ansatte og presenterer det for brukeren
            Verdiene for tekstfeltene settes lik en variabel (this.tlfnr, this.epost). Placeholder på disse settes lik verdi i ansatt
              På denne måten slipper brukeren å slette tekst i feltet før de kan skrive inn endringen
            Verdiene for selectfelt settes lik verdi i ansatt
            */}
          {this.ansatt.map(ansatt => (
            <Card title={'Rediger ansattnr ' + ansatt.ansattnr} key={ansatt.ansattnr}>
              <Form.Label>Tlf. nr:</Form.Label>
              <Form.Input
                type="text"
                id="tlfInput"
                value={this.tlfnr}
                placeholder={ansatt.tlfnr}
                onChange={event => (this.tlfnr = event.target.value)}   //Lagrer brukerens input idet brukeren skriver
              />

              <Form.Label>Epost:</Form.Label>
              <Form.Input
                type="text"
                id="epostInput"
                value={this.epost}
                placeholder={ansatt.epost}
                onChange={event => (this.epost = event.target.value)}   //Lagrer brukerens input idet brukeren skriver
              />

              <Form.Label>Fornavn:</Form.Label>
              <Form.Input
                type="text"
                id="fnavnInput"
                value={this.fnavn}
                placeholder={ansatt.fnavn}
                onChange={event => (this.fnavn = event.target.value)}   //Lagrer brukerens input idet brukeren skriver
              />

              <Form.Label>Etternavn:</Form.Label>
              <Form.Input
                type="text"
                id="enavnInput"
                value={this.enavn}
                placeholder={ansatt.enavn}
                onChange={event => (this.enavn = event.target.value)}   //Lagrer brukerens input idet brukeren skriver
              />

              <Form.Label>Admin:</Form.Label>
              <select
                className="form-control"
                id="adminInput"
                value={ansatt.admin}
                onChange={event => (ansatt.admin = event.target.value)}>   //Lagrer endringen når den skjer

                <option>Er vedkommende admin?</option>
                <option value="0">Nei</option>
                <option value="1">Ja</option>
              </select>

              <Form.Label>Utleienavn:</Form.Label>
              <Form.Input
                type="text"
                id="utleieInput"
                value={this.utleienavn}
                placeholder={ansatt.utleienavn}
                onChange={event => (this.utleienavn = event.target.value)}    //Lagrer brukerens input idet brukeren skriver
              />

              <Form.Label>Stilling:</Form.Label>
              <select
                className="form-control"
                form="formen"
                id="stillingInput"
                value={ansatt.stilling}
                onChange={event => (ansatt.stilling = event.target.value)}>   //Lagrer endringen når den skjer

                <option>Vedkommendes stilling</option>
                <option value="Daglig leder">Daglig leder</option>
                <option value="Sektretær">Sektretær</option>
                <option value="Selger">Selger</option>
                <option value="Lagerarbeider">Lagerarbeider</option>
              </select>
            </Card>
          ))}
          <br />
          <div className="knapper">
            <span className="tilbakeMeny2">
              <Button.Success onClick={this.save}>Lagre endring</Button.Success>
            </span>
            <span className="tilbakeMeny">
              <Button.Primary onClick={this.cancel}>Avbryt endring</Button.Primary>
            </span>
            <span className="tilbakeMeny">
              <Button.Danger onClick={this.slett}>Slett ansatt</Button.Danger>
            </span>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    this.ansattnr = this.props.match.params.ansattnr;   //Henter ansattnummer fra del av path definert som ansattnr i index.js
    ansattService.getAnsattEndring(this.ansattnr, ansatt => {   //Henter spesifikk ansatt og lagrer det i this.ansatt
      this.ansatt = ansatt;
    });
    console.log(this.ansatt);
  }
  save() {    //Pusher endringer til databasen, hvis ingen endringer er gjort vil nåværende informasjon pushes på nytt. Brukeren må være administrator
    this.sjekkFelt();
    if (window.admin == true) {
      ansattService.updateAnsatt(this.tlfnr, this.epost, this.fnavn, this.enavn, this.ansatt[0].admin, this.utleienavn, this.ansatt[0].stilling, this.ansattnr, () => {
          history.push('/endring/ansatt');
        }
      );
    } else {
      alert('Du må ha administratortilgang for å endre ansatt');
    }
  }
  cancel() {    //Går tilbake til forrige side brukeren var på (endring/ansatt)
    history.goBack();
  }
  sjekkFelt() {   //Sjekker om det er gjort endringer. Hvis ikke settes variablene lik tilsvarende i databasen
      if (document.getElementById('tlfInput').value === '') {
        this.tlfnr = this.ansatt[0].tlfnr;
      }
      if (document.getElementById('epostInput').value === '') {
        this.epost = this.ansatt[0].epost;
      }
      if (document.getElementById('fnavnInput').value === '') {
        this.fnavn = this.ansatt[0].fnavn;
      }
      if (document.getElementById('enavnInput').value === '') {
        this.enavn = this.ansatt[0].enavn;
      }
      if (document.getElementById('utleieInput').value === '') {
        this.utleienavn = this.ansatt[0].utleienavn;
      }
    console.log(this.tlfnr, this.epost, this.fnavn, this.enavn, this.admin, this.utleienavn, this.stilling);
  }
  slett() {   //Sletter den ansatte fra databasen hvis brukeren er administrator
    if (window.admin == true) {
      ansattService.slettAnsatt(this.props.match.params.ansattnr, () => {
        history.push('/endring/ansatt');
      });
    } else {
      alert(window.tbm);    //Gir varsel om at brukeren ikke er administrator
    }
  }
}
