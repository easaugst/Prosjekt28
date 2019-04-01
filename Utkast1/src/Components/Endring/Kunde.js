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
    window.scrollTo(0, 0);
    kundeService.getKunde(kunde => {
      this.kArray = kunde;
    });
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
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
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
            <Button.Light onClick={this.cancel}>Avbryt endring</Button.Light>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.slett}>Slett kunde</Button.DangerOl>
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
    this.log();
    kundeService.updateKunde(this.props.match.params.kundenr, this.fnavn, this.enavn, this.epost, this.tlf, () => {
      history.push('/endring/kunde');
    });
    console.log(this.fnavn, this.enavn, this.epost, this.tlf);
  }
  cancel() {
    history.goBack();
  }
  slett() {
    if (window.admin == true) {
      kundeService.slettKunde(this.props.match.params.kundenr, () => {
        history.goBack();
      });
    } else {
      alert(window.tbm);
    }
  }
  log() {
    this.kunde.map(kunde => {
      if (document.getElementById('fnavnInput').value === '') {
        this.fnavn = kunde.fnavn;
      }
      if (document.getElementById('enavnInput').value === '') {
        this.enavn = kunde.enavn;
      }
      if (document.getElementById('epostInput').value === '') {
        this.epost = kunde.epost;
      }
      if (document.getElementById('tlfInput').value === '') {
        this.tlf = kunde.tlf;
      }
    });
    console.log(this.fnavn, this.enavn, this.epost, this.tlf);
  }
}
