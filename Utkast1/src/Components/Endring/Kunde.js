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

export class KundeEndring extends Component {
  kArray = [];
  tid = '';

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Kundenummer</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>E-post</th>
            <th>Telefonnummer</th>
            <th>Fødselsdato</th>
            <th>Tid registrert</th>
            <th> Rediger </th>
          </Table.Rad>
          {this.kArray.map(kunde => (
            <Table.Rad key={kunde.kundenr}>
              <td>{kunde.kundenr}</td>
              <td>{kunde.fnavn}</td>
              <td>{kunde.enavn}</td>
              <td>{kunde.epost}</td>
              <td>{kunde.tlf}</td>
              <td>
                {JSON.stringify(kunde.fdag)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -15)}
              </td>
              <td>
                {JSON.stringify(kunde.rtid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>
                <List.Item to={'/endring/kunde/' + kunde.kundenr + '/'}>Rediger</List.Item>
              </td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    kundeService.getKunde(this.props.match.params.kundenr, kunde => {
      this.kArray = kunde;
    });
  }
}

export class KundeEndringMeny extends Component {
  fnavn = null;
  enavn = null;
  epost = null;
  tlf = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre kundeinformasjon">
          <Form.Label>Fornavn:</Form.Label>
          <Form.Input type="text" value={this.fnavn} onChange={event => (this.fnavn = event.target.value)} />

          <Form.Label>Etternavn:</Form.Label>
          <Form.Input type="text" value={this.enavn} onChange={event => (this.enavn = event.target.value)} />

          <Form.Label>Epost:</Form.Label>
          <Form.Input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />

          <Form.Label>Tlf:</Form.Label>
          <Form.Input type="text" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Lagre endring{' '}
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
    kundeService.getKunde(this.props.match.params.kundenr, kunde => {
      this.fnavn = kunde.fnavn;
      this.enavn = kunde.enavn;
      this.epost = kunde.epost;
      this.tlf = kunde.tlf;
    });
  }
  save() {
    kundeService.updateKunde(this.fnavn, this.enavn, this.epost, this.tlf, this.props.match.params.id, () => {
      history.push('/endring/kunde');
    });
  }
  cancel() {
    history.goBack();
  }
}
