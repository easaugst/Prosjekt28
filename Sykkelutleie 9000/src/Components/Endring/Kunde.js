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

export class KundeEndring extends Component {
  kArray = [];    //Inneholder kunder hentet fra databasen. Brukes for .map() av tabell

  //sideMengde, sider, aktivSide og sisteSide brukes til å dele tabelloversikten inn i flere sider. 'sider' brukes for .map() av sidene
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  kunder = '';    //Antall kunder. Brukes ti lå dele tabelloversikten inn i flere sider.

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrér:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn" autoFocus></Form.Input>
      </div>
      {/*  Se ./Ansatt  */}
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
                <th>Kunde</th>
                <th>Fornavn</th>
                <th>Etternavn</th>
                <th>E-post</th>
                <th>Telefon</th>
                <th>Fødselsdato</th>
                <th>Dato registrert</th>
                <th>Rediger</th>
              </Table.Rad>
              {/*  Se ./Ansatt  */}
              {this.kArray.slice(mengde.forrigeSide, mengde.sideMengde).map(kunde => (
                <Table.Rad key={kunde.kundenr}>
                  <td>{kunde.kundenr}</td>
                  <td>{kunde.fnavn}</td>
                  <td>{kunde.enavn}</td>
                  <td>{kunde.epost}</td>
                  <td>{kunde.tlf}</td>
                  <td>
                    {/*  Viser tid i lokal tidssone  */}
                    {kunde.fdag.toLocaleString()
                      .replace(/,/g, '')
                      .slice(0, -9)}
                  </td>
                  <td>
                    <center>
                    {/*  Viser tid i lokal tidssone  */}
                      {kunde.rtid.toLocaleString()
                        .replace(/,/g, '')
                        .slice(0, -9)}
                    </center>
                  </td>
                  <td>
                    <List.Item to={'/endring/kunde/' + kunde.kundenr + '/'}>Rediger</List.Item>
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
    kundeService.countKunder(kunder => {
      this.kunder = parseInt(kunder.substr(kunder.lastIndexOf(':') + 1));
      console.log(this.kunder);
      this.kundeSortering();
    });
    kundeService.getKunde(kunde => {
      this.kArray = kunde;
    });
  }
  filter() {    //Filtrerer ut fra kundenavn
    var tekst = document.getElementById('input').value;
    tekst = "%" + tekst + "%";
      kundeService.getKundeFilt(tekst, kundeF => {
        this.kArray = kundeF;
      });
    this.pageSwitchH();
    this.forceUpdate();
  }
  pages() {
    this.sideMengde = parseInt(document.getElementById('sidemengde').value);
    kundeService.getKunde(kunde => {
      this.kArray = kunde;
    });
    this.kundeSortering();
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

  kundeSortering() {
    if (this.kunder > this.sideMengde) {
      this.sisteSide = this.kunder % this.sideMengde;
      this.kunder -= this.sisteSide;
      console.log(this.kunder, this.sisteSide);
    }
    for (var i = 1; i <= (this.kunder / this.sideMengde + 1); i++) {
      if (i == (this.kunder / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });
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

export class KundeEndringMeny extends Component {
  kundenr = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  kunde = [];
  fnavn = '';
  enavn = '';
  epost = '';
  tlf = '';

  render() {
    return (
      <div className="mainView">
        {this.kunde.map(kunde => (
          <Card title={'Rediger kundenr ' + kunde.kundenr}>
            <Form.Label>Fornavn:</Form.Label>
            <Form.Input
              type="text"
              id="fnavnInput"
              value={this.fnavn}
              placeholder={kunde.fnavn}
              onChange={event => (this.fnavn = event.target.value)}
            />

            <Form.Label>Etternavn:</Form.Label>
            <Form.Input
              type="text"
              id="enavnInput"
              value={this.enavn}
              placeholder={kunde.enavn}
              onChange={event => (this.enavn = event.target.value)}
            />

            <Form.Label>Epost:</Form.Label>
            <Form.Input
              type="text"
              id="epostInput"
              value={this.epost}
              placeholder={kunde.epost}
              onChange={event => (this.epost = event.target.value)}
            />

            <Form.Label>Tlf:</Form.Label>
            <Form.Input
              type="text"
              id="tlfInput"
              value={this.tlf}
              placeholder={kunde.tlf}
              onChange={event => (this.tlf = event.target.value)}
            />
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
            <Button.Danger onClick={this.slett}>Slett kunde</Button.Danger>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    kundeService.getKundeEndring(this.props.match.params.kundenr, kunde => {
      this.kunde = kunde;
    });
  }
  save() {
    this.sjekkFelt();
    kundeService.updateKunde(this.props.match.params.kundenr, this.fnavn, this.enavn, this.epost, this.tlf, () => {
      history.push('/endring/kunde');
    });
    console.log(this.fnavn, this.enavn, this.epost, this.tlf);
  }
  slett() {   //Sletter kunden hvis brukeren er administrator
    if (window.admin == true) {
      kundeService.slettKunde(this.props.match.params.kundenr, () => {
        history.goBack();
      });
    } else {
      alert(window.tbm);
    }
  }
  sjekkFelt() {
    if (document.getElementById('fnavnInput').value === '') {
      this.fnavn = this.kunde[0].fnavn;
    }
    if (document.getElementById('enavnInput').value === '') {
      this.enavn = this.kunde[0].enavn;
    }
    if (document.getElementById('epostInput').value === '') {
      this.epost = this.kunde[0].epost;
    }
    if (document.getElementById('tlfInput').value === '') {
      this.tlf = this.kunde[0].tlf;
    }
    console.log(this.fnavn, this.enavn, this.epost, this.tlf);
  }

  cancel() {
    history.goBack();
  }
}
