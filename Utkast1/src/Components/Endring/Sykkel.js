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
            <th>Status</th>
            <th>Befinnelse</th>
            <th>Beskrivelse</th>
            <th>Nåværende bestilling</th>
            <th>Tilhører utleiested</th>
            <th>Rediger</th>
          </Table.Rad>
          {this.sArray.map(sykkel => (
            <Table.Rad key={sykkel.regnr}>
              <td>{sykkel.regnr}</td>
              <td>{sykkel.utnavn}</td>
              <td>{sykkel.status}</td>
              <td>{sykkel.befinnelse}</td>
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
    sykkelService.getSykkel(sykkel => {
      this.sArray = sykkel;
    });
  }
}

export class SykkelEndringMeny extends Component {
  regnr = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  sykkel = [];
  sykkeltypeid = null;
  status = null;
  befinnelse = '';
  beskrivelse = '';
  utleienavn = '';

  render() {
    return (
      <div className="mainView">
        {this.sykkel.map(sykkel => (
          <Card title={'Rediger regnr ' + sykkel.regnr} key={sykkel.regnr}>
            <Form.Label>Sykkeltype:</Form.Label>
            <select
              className="form-control"
              value={sykkel.sykkeltypeid}
              onChange={event => (sykkel.sykkeltypeid = event.target.value)}
            >
              <option>Sykkeltype</option>
              <option value="1">Terrengsykkel</option>
              <option value="2">Landeveissykkel</option>
              <option value="3">Tandemsykkel</option>
              <option value="12">Downhillsykkel</option>
              <option value="13">Racersykkel</option>
              <option value="14">Barnesykkel</option>
            </select>

            <Form.Label>Status:</Form.Label>
            <select
              className="form-control"
              form="formen"
              id="statusInput"
              value={sykkel.status}
              onChange={event => (sykkel.status = event.target.value)}
            >
              <option value="Lager">Lager</option>
              <option value="Utleid">Utleid</option>
              <option value="Service">Service</option>
              <option value="Stjålet">Stjålet</option>
            </select>

            <Form.Label>Befinnelse:</Form.Label>
            <Form.Input
              type="text"
              id="befinnelseInput"
              value={this.befinnelse}
              placeholder={sykkel.befinnelse}
              onChange={event => (this.befinnelse = event.target.value)}
            />

            <Form.Label>Beskrivelse:</Form.Label>
            <Form.Input
              type="text"
              id="beskrivelseInput"
              value={this.beskrivelse}
              placeholder={sykkel.beskrivelse}
              onChange={event => (this.beskrivelse = event.target.value)}
            />

            <Form.Label>Tilhører utleiested:</Form.Label>
            <Form.Input
              type="text"
              id="utleienavnInput"
              value={this.utleienavn}
              placeholder={sykkel.utleienavn}
              onChange={event => (this.utleienavn = event.target.value)}
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
            <Button.DangerOl onClick={this.slett}>Slett sykkel</Button.DangerOl>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.getSykkelEndring(this.props.match.params.regnr, sykkel => {
      this.sykkel = sykkel;
    });
  }
  save() {
    this.log();
    sykkelService.updateSykkel(
      this.sykkeltypeid,
      this.status,
      this.befinnelse,
      this.beskrivelse,
      this.utleienavn,
      this.props.match.params.regnr,
      () => {
        history.push('/endring/sykkel');
      }
    );
  }
  cancel() {
    history.goBack();
  }
  slett() {
    if (window.admin == true) {
      sykkelService.slettSykkel(this.props.match.params.regnr, () => {
        history.push('/endring/sykkel');
      });
    } else {
      alert(window.tbm);
    }
  }
  log() {
    this.sykkel.map(sykkel => {
      if (this.sykkeltypeid === null) {
        this.sykkeltypeid = sykkel.sykkeltypeid;
      }
      if (this.status === null) {
        this.status = sykkel.status;
      }
      if (document.getElementById('befinnelseInput').value == '') {
        this.befinnelse = sykkel.befinnelse;
      }
      if (document.getElementById('beskrivelseInput').value == '') {
        this.beskrivelse = sykkel.beskrivelse;
      }
      if (document.getElementById('utleienavnInput').value == '') {
        this.utleienavn = sykkel.utleienavn;
      }
    });
    console.log(this.sykkeltypeid, this.status, this.befinnelse, this.beskrivelse, this.utleienavn);
  }
}
