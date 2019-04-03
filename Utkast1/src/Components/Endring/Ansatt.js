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
  aArray = [];
  tekst = "";
  ftekst = "";
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  ansatte = '';

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrér:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
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
                <th>Ansattnummer</th>
                <th>Tlf.nr</th>
                <th>Epost</th>
                <th>Fornavn</th>
                <th>Etternavn</th>
                <th>Administrator</th>
                <th>Arbeidsplass</th>
                <th>Stilling</th>
                <th>Rediger</th>
              </Table.Rad>
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
  mounted() {
    window.scrollTo(0, 0);
    ansattService.countAnsatt(ansatte => {
      this.ansatte = parseInt(ansatte.substr(ansatte.lastIndexOf(':') + 1));
      console.log(this.ansatte);
      this.ansattSortering();
    })
    ansattService.getAnsatt(this.props.match.params.ansattnr, ansatt => {
      this.aArray = ansatt;
    });
  }
  filter() {
    this.tekst = document.getElementById('input').value;
    this.ftekst = "%" + this.tekst + "%";

      ansattService.getAnsattFilt(this.ftekst, this.ftekst, ansattF => {
        this.aArray = ansattF;
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

  ansattSortering() {
    if (this.ansatte > this.sideMengde) {
      this.sisteSide = this.ansatte % this.sideMengde;
      this.ansatte -= this.sisteSide;
      console.log(this.ansatte, this.sisteSide);
    }
    for (var i = 1; i <= (this.ansatte / this.sideMengde + 1); i++) {
      if (i == (this.ansatte / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });
          console.log('Første side opprettet:', this.sider[0]);
        } else {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde })
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
  }
}

export class AnsattEndringMeny extends Component {
  ansattnr = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  ansatt = [];
  tlfnr = '';
  epost = '';
  fnavn = '';
  enavn = '';
  admin = null;
  utleienavn = '';
  stilling = null;

  render() {
    return (
      <div>
        <div className="mainView">
          {this.ansatt.map(ansatt => (
            <Card title={'Rediger ansattnr ' + ansatt.ansattnr} key={ansatt.ansattnr}>
              <Form.Label>Tlf. nr.:</Form.Label>
              <Form.Input
                type="text"
                id="tlfInput"
                value={this.tlfnr}
                placeholder={ansatt.tlfnr}
                onChange={event => (this.tlfnr = event.target.value)}
              />

              <Form.Label>Epost:</Form.Label>
              <Form.Input
                type="text"
                id="epostInput"
                value={this.epost}
                placeholder={ansatt.epost}
                onChange={event => (this.epost = event.target.value)}
              />

              <Form.Label>Fornavn:</Form.Label>
              <Form.Input
                type="text"
                id="fnavnInput"
                value={this.fnavn}
                placeholder={ansatt.fnavn}
                onChange={event => (this.fnavn = event.target.value)}
              />

              <Form.Label>Etternavn:</Form.Label>
              <Form.Input
                type="text"
                id="enavnInput"
                value={this.enavn}
                placeholder={ansatt.enavn}
                onChange={event => (this.enavn = event.target.value)}
              />

              <Form.Label>Admin:</Form.Label>
              <select
                className="form-control"
                id="adminInput"
                value={ansatt.admin}
                onChange={event => (ansatt.admin = event.target.value)}
              >
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
                onChange={event => (this.utleienavn = event.target.value)}
              />

              <Form.Label>Stilling:</Form.Label>
              <select
                className="form-control"
                form="formen"
                id="stillingInput"
                value={ansatt.stilling}
                onChange={event => (ansatt.stilling = event.target.value)}
              >
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
              <Button.DangerOl onClick={this.slett}>Slett ansatt</Button.DangerOl>
            </span>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    ansattService.getAnsattEndring(this.ansattnr, ansatt => {
      this.ansatt = ansatt;
    });
    console.log(this.ansatt);
  }
  save() {
    this.log();
    if (window.admin == true) {
      ansattService.updateAnsatt(
        this.tlfnr,
        this.epost,
        this.fnavn,
        this.enavn,
        this.admin,
        this.utleienavn,
        this.stilling,
        this.ansattnr,
        () => {
          history.push('/endring/ansatt');
        }
      );
    } else {
      alert('Du må ha administratortilgang for å endre ansatt');
    }
  }
  cancel() {
    history.goBack();
  }
  log() {
    this.ansatt.map(ansatt => {
      if (document.getElementById('tlfInput').value === '') {
        this.tlfnr = ansatt.tlfnr;
      }
      if (document.getElementById('epostInput').value === '') {
        this.epost = ansatt.epost;
      }
      if (document.getElementById('fnavnInput').value === '') {
        this.fnavn = ansatt.fnavn;
      }
      if (document.getElementById('enavnInput').value === '') {
        this.enavn = ansatt.enavn;
      }
      if (this.admin === null) {
        this.admin = ansatt.admin;
      }
      if (document.getElementById('utleieInput').value === '') {
        this.utleienavn = ansatt.utleienavn;
      }
      if (this.stilling === null) {
        this.stilling = ansatt.stilling;
      }
    });
    console.log(this.tlfnr, this.epost, this.fnavn, this.enavn, this.admin, this.utleienavn, this.stilling);
  }
  slett() {
    if (window.admin == true) {
      ansattService.slettAnsatt(this.props.match.params.ansattnr, () => {
        history.push('/endring/ansatt');
      });
    } else {
      alert(window.tbm);
    }
  }
}
