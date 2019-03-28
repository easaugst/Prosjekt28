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

export class SykkelOversikt extends Component {
  sArray = [];
  sideMengde = 25;
  number = 0;

  render() {
    return (
      <div className="mainView">
        <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
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
        <select id="sidemengde" className="form-control" onChange={this.pages}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <Table>
          <Table.Rad>
            <th>Reg nr.</th>
            <th>Sykkeltype</th>
            <th>Status</th>
            <th>Befinnelse</th>
            <th>Beskrivelse</th>
            <th>Nåværende bestilling</th>
            <th>Tilhører utleiested</th>
          </Table.Rad>
          {this.sArray.slice(0, this.sideMengde).map(sykkel => (
            <Table.Rad key={sykkel.regnr}>
              <td>{sykkel.regnr}</td>
              <td>{sykkel.utnavn}</td>
              <td>{sykkel.status}</td>
              <td>{sykkel.befinnelse}</td>
              <td>{sykkel.beskrivelse}</td>
              <td>{sykkel.bestillingsid}</td>
              <td>{sykkel.utleienavn}</td>
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
    this.forceUpdate();
  }
  pages() {
    this.sideMengde = parseInt(document.getElementById('sidemengde').value);
    this.forceUpdate();
  }
}
