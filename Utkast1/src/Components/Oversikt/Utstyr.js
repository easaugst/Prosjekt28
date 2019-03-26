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
  uFArray = [];
  number = 0;
  a = "";
  b = 2;

  render() {
    return (
      <div className="mainView">
        <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
          <select id="drop" className="form-control" form="formen" onChange={this.filter}>
            <option value="0">Alle</option>
            <option value="4">Hjelmer</option>
            <option value="5">Lappesett</option>
            <option value="6">Sykkelveske</option>
            <option value="7">Barnesete</option>
            <option value="8">Barnehenger</option>
            <option value="9">Lastehenger</option>
            <option value="10">Beskytter</option>
            <option value="11">Lås</option>
          </select>
        </div>

        <Table>
          <Table.Rad>
            <th>Utstyrsnr</th>
            <th>Utstyrstype</th>
            <th>Status</th>
          </Table.Rad>
          {this.uArray.map((utstyr /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
            <Table.Rad key={utstyr.utstyrsid}>
              <td>{utstyr.utstyrsid}</td>
              <td>{utstyr.utnavn}</td>
              <td>{utstyr.ustatus}</td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyr(utstyr => {
      this.uArray = utstyr;
    }
  );
  // this.start();
  }

  filter() {
    this.number = document.getElementById('drop').value;
    if(this.number > 3){
    utstyrService.getUtstyrFilt(this.number, utstyrF => {
      this.uArray = utstyrF;
    });
  }
  else {
    utstyrService.getUtstyr(utstyr => {
      this.uArray = utstyr;
    }
  );
  }
    this.forceUpdate();
  }

  // start() {
  //   while(this.b <=3) {
  //     this.a = ('utstyr' + this.b);
  //     document.getElementById(this.a).style.display = "none";
  //     this.b ++;
  //   }
  // }
  //
  // vis() {
  //   for(var i=1;i<=3;i++) {
  //     if(i == this.number ){
  //         this.a = ('utstyr' + this.number);
  //         document.getElementById(this.a).style.display = "block";
  //     }
  //     else {
  //       this.a = ('utstyr' + i);
  //       document.getElementById(this.a).style.display = "none";
  //     }
  // }
  // }

}
