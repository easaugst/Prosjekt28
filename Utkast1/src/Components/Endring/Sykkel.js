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
  number = 0;
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  sykler = '';

  render() {
    return (
      <div className="mainView">
        <div className="filterView">
          <Form.Label>Filtrér:</Form.Label>
          <select id="drop" className="form-control" form="formen" onChange={this.filter}>
            <option value="0">Alle</option>
            <option value="1">Terrengsykkel</option>
            <option value="2">Landeveissykkel</option>
            <option value="3">Tandemsykkel</option>
            <option value="12">Downhillsykkel</option>
            <option value="13">Racersykkel</option>
            <option value="14">Barnesykkel</option>
          </select>
        </div>
        {/*
          <select id="sidemengde" className="form-control" onChange={this.pages}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          </select>
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
                <th>Reg nr.</th>
                <th>Sykkeltype</th>
                <th>Status</th>
                <th>Befinnelse</th>
                <th>Beskrivelse</th>
                <th>Tilhører utleiested</th>
                <th>Rediger</th>
              </Table.Rad>
              {this.sArray.slice(mengde.forrigeSide, mengde.sideMengde).map(sykkel => (
                <Table.Rad key={sykkel.regnr}>
                  <td>{sykkel.regnr}</td>
                  <td>{sykkel.utnavn}</td>
                  <td>{sykkel.status}</td>
                  <td>{sykkel.befinnelse}</td>
                  <td>{sykkel.beskrivelse}</td>
                  <td>{sykkel.utleienavn}</td>
                  <td>
                    <List.Item to={'/endring/sykkel/' + sykkel.regnr + '/'}>Rediger</List.Item>
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
    sykkelService.countSykler(sykler => {
      this.sykler = parseInt(sykler.substr(sykler.lastIndexOf(':') + 1));
      console.log(this.sykler);
      this.sykkelSortering();
    })
    sykkelService.getSykkel(sykkel => {
      this.sArray = sykkel;
    });
  }
  filter() {
    this.number = document.getElementById('drop').value;
    if ((this.number <= 3 && this.number != 0) || this.number >= 12) {
      sykkelService.getSykkelFilt(this.number, sykkelF => {
        this.sArray = sykkelF;
      });
    } else {
      sykkelService.getSykkel(sykkel => {
        this.sArray = sykkel;
      });
    }
    this.pageSwitchH();
    this.forceUpdate();
  }
  pages() {
    this.sideMengde = parseInt(document.getElementById('sidemengde').value);
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

  sykkelSortering() {
    if (this.sykler > this.sideMengde) {
      this.sisteSide = this.sykler % this.sideMengde;
      this.sykler -= this.sisteSide;
      console.log(this.sykler, this.sisteSide);
    }
    for (var i = 1; i <= (this.sykler / this.sideMengde + 1); i++) {
      if (i == (this.sykler / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde});
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
            <Button.Primary onClick={this.cancel}>Avbryt endring</Button.Primary>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.slett}>Slett sykkel</Button.DangerOl>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
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
