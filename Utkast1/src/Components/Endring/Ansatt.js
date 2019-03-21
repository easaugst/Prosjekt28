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

  render() {
    return (
      <div className="mainView">
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

            <th> Rediger </th>
          </Table.Rad>
          {this.aArray.map((ansatt /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
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
    );
  }
  mounted() {
    ansattService.getAnsatt(this.props.match.params.ansattnr, ansatt => {
      this.aArray = ansatt;
    });
  }
}

export class AnsattEndringMeny extends Component {
  ansattnr = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  ansatt = [];
  tlfnr = "";
  epost = "";
  fnavn = "";
  enavn = "";
  admin = null;
  utleienavn = "";
  stilling = "";

  render() {
    return (
      <div>
        <div className="mainView">

          {this.ansatt.map(ansatt => (
            <Card title="Nåværende ansattnformasjon" key={ansatt.ansattnr}>
              <Form.Label>Tlf. nr.:</Form.Label>
              <Form.Input type="text" id="tlfDef" value={ansatt.tlfnr} onChange={event => (this.tlfnr = event.target.value)} disabled />

              <Form.Label>Epost:</Form.Label>
              <Form.Input type="text" id="epostDef" value={ansatt.epost} onChange={event => (this.epost = event.target.value)} disabled />

              <Form.Label>Fornavn:</Form.Label>
              <Form.Input type="text" id="fnavnDef" value={ansatt.fnavn} onChange={event => (this.fnavn = event.target.value)} disabled />

              <Form.Label>Etternavn:</Form.Label>
              <Form.Input type="text" id="enavnDef" value={ansatt.enavn} onChange={event => (this.enavn = event.target.value)} disabled />

              <Form.Label>Admin:</Form.Label>
              <select className="form-control" id="adminDef" value={ansatt.admin} onChange={event => (this.admin = event.target.value)} disabled>
                <option>Er vedkommende admin?</option>
                <option value="0">Nei</option>
                <option value="1">Ja</option>
              </select>

              <Form.Label>Utleienavn:</Form.Label>
              <Form.Input type="text" id="utleieDef" value={ansatt.utleienavn} onChange={event => (this.utleienavn = event.target.value)} disabled />

              <Form.Label>Stilling:</Form.Label>
              <Form.Input type="text" id="stillingDef" value={ansatt.stilling} onChange={event => (this.stilling = event.target.value)} disabled />
            </Card>
          ))}
        </div>
        <div className="parallelView">

          {this.ansatt.map(ansatt => (
            <Card title="Nåværende ansattnformasjon" key={ansatt.ansattnr}>
              <Form.Label>Tlf. nr.:</Form.Label>
              <Form.Input type="text" id="tlfInput" value={this.tlfnr} placeholder={ansatt.tlfnr} onChange={event => (this.tlfnr = event.target.value)} />

              <Form.Label>Epost:</Form.Label>
              <Form.Input type="text" id="epostInput" value={this.epost} placeholder={ansatt.epost}onChange={event => (this.epost = event.target.value)} />

              <Form.Label>Fornavn:</Form.Label>
              <Form.Input type="text" id="fnavnInput" value={this.fnavn} placeholder={ansatt.fnavn} onChange={event => (this.fnavn = event.target.value)} />

              <Form.Label>Etternavn:</Form.Label>
              <Form.Input type="text" id="enavnInput" value={this.enavn} placeholder={ansatt.enavn} onChange={event => (this.enavn = event.target.value)} />

              <Form.Label>Admin:</Form.Label>
              <select className="form-control" id="adminInput" value={this.admin} onChange={event => (this.admin = event.target.value)}>
                <option>Er vedkommende admin?</option>
                <option value="0">Nei</option>
                <option value="1">Ja</option>
              </select>

              <Form.Label>Utleienavn:</Form.Label>
              <Form.Input type="text"  id="utleieInput" value={this.utleienavn} placeholder={ansatt.utleienavn} onChange={event => (this.utleienavn = event.target.value)} />

              <Form.Label>Stilling:</Form.Label>
              <Form.Input type="text"  id="stillingInput" value={this.stilling} placeholder={ansatt.stilling} onChange={event => (this.stilling = event.target.value)} />
            </Card>
          ))}
          <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success onClick={this.save}>
              Lagre endring
            </Button.Success>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.cancel}>
              Avbryt
            </Button.DangerOl>
          </span>
        </div>
        </div>
      </div>
    );
  }
  mounted() {
    ansattService.getAnsattEndring(this.ansattnr, ansatt => {
      this.ansatt = ansatt;
    });
    console.log(this.ansatt);
  }
  save() {
    this.log();
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
  }
  cancel() {
    history.goBack();
  }
  log() {
    if (document.getElementById('tlfInput').value === "") {
      this.tlfnr = document.getElementById('tlfDef').value;
    }
    if (document.getElementById('epostInput').value === "") {
      this.epost = document.getElementById('epostDef').value;
    }
    if (document.getElementById('fnavnInput').value === "") {
      this.fnavn = document.getElementById('fnavnDef').value;
    }
    if (document.getElementById('enavnInput').value === "") {
      this.enavn = document.getElementById('enavnDef').value;
    }
    if (this.admin === null) {
      this.admin = document.getElementById('adminDef').value;
    }
    if (document.getElementById('utleieInput').value === "") {
      this.utleienavn = document.getElementById('utleieDef').value;
    }
    if (document.getElementById('stillingInput').value === "") {
      this.stilling = document.getElementById('stillingDef').value;
    }
    console.log(this.tlfnr, this.epost, this.fnavn, this.enavn, this.admin, this.utleienavn, this.stilling);
  }
}
