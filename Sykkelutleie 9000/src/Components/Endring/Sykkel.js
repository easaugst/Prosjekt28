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
  sArray = [];    //Inneholder ansatte hentet fra databasen. Brukes for .map() av tabell

  //sideMengde, sider, aktivSide og sisteSide brukes til å dele tabelloversikten inn i flere sider. 'sider' brukes for .map() av sidene
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  sykler = '';    //Antall sykler. Brukes til å dele tabelloversiken inn i flere sider

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
                <th>Reg nr.</th>
                <th>Sykkeltype</th>
                <th>Status</th>
                <th>Befinnelse</th>
                <th>Beskrivelse</th>
                <th>Tilhører utleiested</th>
                <th>Rediger</th>
              </Table.Rad>
              {/*  Se ./Asatt  */}
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
  filter() {    //Filtrerer etter sykkeltype valgt i dropdown
    var number = document.getElementById('drop').value;
    if ((number <= 3 && number != 0) || number >= 12) {
      sykkelService.getSykkelFilt(number, sykkelF => {
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
  regnr = '';
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
            <Button.Danger onClick={this.slett}>Slett sykkel</Button.Danger>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    this.regnr = this.props.match.params.regnr;
    sykkelService.getSykkelEndring(this.regnr, sykkel => {
      this.sykkel = sykkel;
    });
  }
  save() {
    this.sjekkFelt();
    sykkelService.updateSykkel( this.sykkeltypeid, this.status, this.befinnelse, this.beskrivelse, this.utleienavn, this.regnr,
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
      sykkelService.slettSykkel(this.regnr, () => {
        history.push('/endring/sykkel');
      });
    } else {
      alert(window.tbm);
    }
  }
  sjekkFelt() {
    if (this.sykkeltypeid === null) {
      this.sykkeltypeid = this.sykkel[0].sykkeltypeid;
    }
    if (this.status === null) {
      this.status = this.sykkel[0].status;
    }
    if (document.getElementById('befinnelseInput').value == '') {
      this.befinnelse = this.sykkel[0].befinnelse;
    }
    if (document.getElementById('beskrivelseInput').value == '') {
      this.beskrivelse = this.sykkel[0].beskrivelse;
    }
    if (document.getElementById('utleienavnInput').value == '') {
      this.utleienavn = this.sykkel[0].utleienavn;
    }
    console.log(this.sykkeltypeid, this.status, this.befinnelse, this.beskrivelse, this.utleienavn);
  }
}
