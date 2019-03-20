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

export class UtstyrOversikt extends Component {
  uArray = [];
  u2Array = [];
  u3Array = [];
  number = 0;
  a = "";
  b = 2;

  render() {
    return (
      <div className="mainView">
        <div id="utstyr1">
        <Table>
          <Table.Rad>
            <th>Utstyrsnr</th>
            <th>Utstyrstype</th>
            <th>Status</th>
          </Table.Rad>
          {this.uArray.map((utstyr /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
            <Table.Rad key={utstyr.utstyrsid}>
              <td>{utstyr.utstyrsid}</td>
              <td>{utstyr.navn}</td>
              <td>{utstyr.ustatus}</td>
            </Table.Rad>
          ))}
        </Table>
        </div>
        <div id="utstyr2">
        <Table>
          <Table.Rad>
            <th>Utstyrsnr</th>
            <th>Utstyrstype</th>
            <th>Status</th>
          </Table.Rad>
          {this.u2Array.map((utstyr2 /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
            <Table.Rad key={utstyr2.utstyrsid}>
              <td>{utstyr2.utstyrsid}</td>
              <td>{utstyr2.navn}</td>
              <td>{utstyr2.ustatus}</td>
            </Table.Rad>
          ))}
        </Table>
        </div>
        <div id="utstyr3">
          <Table>
            <Table.Rad>
              <th>Utstyrsnr</th>
              <th>Utstyrstype</th>
              <th>Status</th>
            </Table.Rad>
            {this.u3Array.map((utstyr3 /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
              <Table.Rad key={utstyr3.utstyrsid}>
                <td>{utstyr3.utstyrsid}</td>
                <td>{utstyr3.navn}</td>
                <td>{utstyr3.ustatus}</td>
              </Table.Rad>
            ))}
          </Table>
          </div>
        <select className="form-control" form="formen" onChange={event => (this.number = event.target.value)}>
          <option value ="1">Velg filter her</option>
          <option value="1">Alle</option>
          <option value="2">Hjelmer</option>
          <option value="3">Lappesett</option>
        </select>
        <button type="button" className="btn btn-success" onClick={this.vis}>
          Filtrer
        </button>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyr(this.props.match.params.utstyrsid, utstyr => {
      this.uArray = utstyr;
    }
  );

  utstyrService.getUtstyr2(this.props.match.params.utstyrsid, utstyr2 => {
    this.u2Array = utstyr2;
  });

  utstyrService.getUtstyr3(this.props.match.params.utstyrsid, utstyr3 => {
    this.u3Array = utstyr3;
  });

  this.start();
  }

  start() {
    while(this.b <=3) {
      this.a = ('utstyr' + this.b);
      document.getElementById(this.a).style.display = "none";
      this.b ++;
    }
  }

  vis() {
    for(var i=1;i<=3;i++) {
      if(i == this.number ){
          this.a = ('utstyr' + this.number);
          document.getElementById(this.a).style.display = "block";
      }
      else {
        this.a = ('utstyr' + i);
        document.getElementById(this.a).style.display = "none";
      }


    }
  }

}
