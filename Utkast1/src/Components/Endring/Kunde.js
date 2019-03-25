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
            <th>Dato registrert</th>
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
                <center>
                  {JSON.stringify(kunde.rtid)
                    .replace(/T|Z|"/g, ' ')
                    .slice(0, -15)}
                </center>
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
            <Button.Success onClick={this.save}>Lagre endring</Button.Success>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.cancel}>Avbryt</Button.DangerOl>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.slett}>
              Slett
            </Button.DangerOl>
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
    kundeService.updateKunde(this.props.match.params.kundenr, this.fnavn, this.enavn, this.epost, this.tlf, () => {
      history.push('/endring/kunde');
    });
    console.log(this.fnavn, this.enavn, this.epost, this.tlf);
  }
  cancel() {
    history.goBack();
  }
  slett() {
      utstyrService.slettUtstyr(this.props.match.params.utstyrsid, () => {
        history.push('/endring/sykkel');
      });
    }
}
