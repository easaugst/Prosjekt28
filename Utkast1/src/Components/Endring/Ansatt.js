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
                <List.Item to={'/endring/ansatt/' + ansatt.ansattnr + '/'}>Rediger</List.Item>
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
  tlfnr = null;
  epost = null;
  fnavn = null;
  enavn = null;
  admin = null;
  utleienavn = null;
  stilling = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre ansattnformasjon">
          <Form.Label>Tlf. nr.:</Form.Label>
          <Form.Input type="text" value={this.tlfnr} onChange={event => (this.tlfnr = event.target.value)} />

          <Form.Label>Epost:</Form.Label>
          <Form.Input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />

          <Form.Label>Fornavn:</Form.Label>
          <Form.Input type="text" value={this.fnavn} onChange={event => (this.fnavn = event.target.value)} />

          <Form.Label>Etternavn:</Form.Label>
          <Form.Input type="text" value={this.enavn} onChange={event => (this.enavn = event.target.value)} />

          <Form.Label>Admin:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.admin = event.target.value)}>
            <option>Er vedkommende admin?</option>
            <option value="0">Nei</option>
            <option value="1">Ja</option>
          </select>

          <Form.Label>Utleienavn:</Form.Label>
          <Form.Input type="text" value={this.utleienavn} onChange={event => (this.utleienavn = event.target.value)} />

          <Form.Label>Stilling:</Form.Label>
          <Form.Input type="text" value={this.stilling} onChange={event => (this.stilling = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Lagre endring
            </button>
          </span>
          <span className="tilbakeMeny">
            <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
              Avbryt
            </button>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    ansattService.getAnsatt(this.props.match.params.ansattnr, ansatt => {
      this.tlfnr = ansatt.tlfnr;
      this.epost = ansatt.epost;
      this.fnavn = ansatt.fnavn;
      this.enavn = ansatt.enavn;
      this.admin = ansatt.admin;
      this.utleienavn = ansatt.utleienavn;
      this.stilling = ansatt.stilling;
    });
  }
  save() {
    ansattService.updateAnsatt(
      this.tlfnr,
      this.epost,
      this.fnavn,
      this.enavn,
      this.admin,
      this.utleienavn,
      this.stilling,
      this.props.match.params.id,
      () => {
        history.push('/endring/ansatt');
      }
    );
  }
  cancel() {
    history.goBack();
  }
}
