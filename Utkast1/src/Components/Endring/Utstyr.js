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

export class UtstyrEndring extends Component {
  uArray = [];
  utput = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Utstyrsnr</th>
            <th>Utstyrstype</th>
            <th>Status</th>
            <th>Rediger</th>
          </Table.Rad>
          {this.uArray.map((
            utstyr,
            index /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/
          ) => (
            <Table.Rad key={utstyr.utstyrsid}>
              <td>{utstyr.utstyrsid}</td>
              <td>{utstyr.utnavn}</td>
              <td>
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={utstyr.ustatus}
                  onChange={event => (utstyr.ustatus = event.target.value)}
                />
              </td>
              <td>
                <List.Item to={'/endring/utstyr/' + utstyr.utstyrsid}>Rediger</List.Item>
              </td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyr(utstyr => {
      this.uArray = utstyr;
    });
  }
}

export class UtstyrEndringMeny extends Component {
  utstyrsid = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  utstyr = [];
  utstyrstypeid = null;
  ustatus = '';

  render() {
    return (
      <div className="mainView">
      {this.utstyr.map(utstyr => (
        <Card title={'Endre utstyr nr: ' + utstyr.utstyrsid} key={utstyr.utstyrsid}>
          <Form.Label>Utstyrstype:</Form.Label>
          <select className="form-control" form="formen" id="utstyrstypeidInput" value={utstyr.utstyrstypeid} onChange={event => (utstyr.utstyrstypeid = event.target.value)}>
            <option value="3">Velg type her</option>
            <option value="4">Hjelm</option>
            <option value="5">Lappesett</option>
            <option value="6">Sykkelveske</option>
            <option value="7">Barnesete</option>
            <option value="8">Barnehenger</option>
            <option value="9">Lastehenger</option>
            <option value="10">Beskytter</option>
            <option value="11">Lås</option>
          </select>

          <Form.Label>Utstyrstatus:</Form.Label>
          <select className="form-control" form="formen" id="ustatusInput" value={utstyr.ustatus} onChange={event => (utstyr.ustatus = event.target.value)}>
            <option value="Lager">Lager</option>
            <option value="Utleid">Utleid</option>
            <option value="Service">Service</option>
            <option value="Stjålet">Stjålet</option>
          </select>
        </Card>
      ))}
        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <Button.Success onClick={this.save}>Lagre endring</Button.Success>
          </span>
          <span className="tilbakeMeny">
            <Button.Light onClick={this.cancel}>Avbryt</Button.Light>
          </span>
          <span className="tilbakeMeny">
            <Button.DangerOl onClick={this.slett}>Slett</Button.DangerOl>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyrEndring(this.props.match.params.utstyrsid, utstyr => {
      this.utstyr = utstyr;
    });
  }
  save() {
    this.log();
    utstyrService.updateUtstyr(this.props.match.params.utstyrsid, this.utstyrstypeid, this.ustatus, () => {
      history.push('/endring/utstyr');
    });
  }
  cancel() {
    history.goBack();
  }
  slett() {
    // var test = new Login();
    //
    // console.log(test.admin)
    //
    // if(admin == true) {
    if(window.admin == true) {
    utstyrService.slettUtstyr(this.props.match.params.utstyrsid, () => {
      history.push('/endring/utstyr');
    });
    }
    else {
      alert(window.tbm);
    }
  }
  // } else {
  //   alert("Du har ikke administratorrettigheter");
  // }
  log() {
    this.utstyr.map(utstyr => {
      if (this.utstyrstypeid === null) {
        this.utstyrstypeid = utstyr.utstyrstypeid;
      }
      this.ustatus = utstyr.ustatus;
      console.log(utstyr.ustatus);
      console.log(this.ustatus);
    });
  }
}
