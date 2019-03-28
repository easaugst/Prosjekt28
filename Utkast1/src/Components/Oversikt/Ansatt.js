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

export class AnsattOversikt extends Component {
  aArray = [];
  tekst = "";
  ftekst ="";

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
        <Table>
          <Table.Rad>
            <th>Ansattnummer</th>
            <th>Tlf.nr</th>
            <th>Epost</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Administrator</th>
            <th>Arbeidsplass</th>
            <th>Stilling</th>
          </Table.Rad>
          {this.aArray.map(ansatt => (
            <Table.Rad key={ansatt.ansattnr}>
              <td>{ansatt.ansattnr}</td>
              <td>{ansatt.tlfnr}</td>
              <td>{ansatt.epost}</td>
              <td>{ansatt.fnavn}</td>
              <td>{ansatt.enavn}</td>
              <td>{ansatt.admin}</td>
              <td>{ansatt.utleienavn}</td>
              <td>{ansatt.stilling}</td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    ansattService.getAnsatt(this.props.match.params.ansattnr, ansatt => {
      this.aArray = ansatt;
    });
  }
  filter() {
    this.tekst = document.getElementById('input').value;
    this.ftekst = "%" + this.tekst + "%";

      ansattService.getAnsattFilt(this.ftekst, this.ftekst, ansattF => {
        this.aArray = ansattF;
      });
    this.forceUpdate();
  }
}
