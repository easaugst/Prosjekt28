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

export class SykkelEndring extends Component {
  sArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Reg nr.</th>
            <th>Sykkeltype</th>
            <th>Befinnelse</th>
            <th>Status</th>
            <th>Beskrivelse</th>
            <th>Nåværende bestilling</th>
            <th>Tilhører utleiested</th>
            <th>Rediger</th>
          </Table.Rad>
          {this.sArray.map(sykkel => (
            <Table.Rad key={sykkel.regnr}>
              <td>{sykkel.regnr}</td>
              <td>{sykkel.utnavn}</td>
              <td>{sykkel.befinnelse}</td>
              <td>{sykkel.status}</td>
              <td>{sykkel.beskrivelse}</td>
              <td>{sykkel.bestillingsid}</td>
              <td>{sykkel.utleienavn}</td>
              <td>
                <List.Item to={'/endring/sykkel/' + sykkel.regnr + '/'}>Rediger</List.Item>
              </td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    sykkelService.getSykkel(this.props.match.params.regnr, sykkel => {
      this.sArray = sykkel;
    });
  }
}

export class SykkelEndringMeny extends Component {
  sykkeltypeid = '';
  befinnelse = null;
  status = null;
  beskrivelse = null;
  utleienavn = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre sykkelinformasjon">
          <Form.Label>Sykkeltype:</Form.Label>
          <select
            className="form-control"
            value={this.sykkeltypeid}
            onChange={event => (this.sykkeltypeid = event.target.value)}
          >
            <option>Sykkeltype</option>
            <option value="1">Terrengsykkel</option>
            <option value="2">Landeveissykkel</option>
            <option value="3">Tandemsykkel</option>
            <option value="12">Downhillsykkel</option>
            <option value="13">Racersykkel</option>
            <option value="14">Barnesykkel</option>
          </select>

          <Form.Label>Befinnelse:</Form.Label>
          <Form.Input type="text" value={this.befinnelse} onChange={event => (this.befinnelse = event.target.value)} />

          <Form.Label>Status:</Form.Label>
          <Form.Input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />

          <Form.Label>Beskrivelse:</Form.Label>
          <Form.Input
            type="text"
            value={this.beskrivelse}
            onChange={event => (this.beskrivelse = event.target.value)}
          />

          <Form.Label>Tilhører utleiested:</Form.Label>
          <Form.Input type="text" value={this.utleienavn} onChange={event => (this.utleienavn = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success onClick={this.save}>Lagre endring</Button.Success>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.cancel}>Avbryt</Button.DangerOl>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.getSykkel(this.props.match.params.regnr, sykkel => {
      this.sykkeltypeid = sykkel.sykkeltypeid;
      this.befinnelse = sykkel.befinnelse;
      this.status = sykkel.status;
      this.beskrivelse = sykkel.beskrivelse;
      this.utleienavn = sykkel.utleienavn;
    });
  }
  save() {
    console.log(this.props.match.params.id);
    sykkelService.updateSykkel(
      this.sykkeltypeid,
      this.befinnelse,
      this.status,
      this.beskrivelse,
      this.utleienavn,
      this.props.match.params.id,
      () => {
        history.push('/endring/sykkel');
      }
    );
  }
  cancel() {
    history.goBack();
  }
}
