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

export class KundeOversikt extends Component {
  kArray = [];
  tid = '';
  tekst = "";
  ftekst = "";
  sideMengde = 10;



  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
      <select id="sidemengde" className="form-control" onChange={this.pages}>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
        <Table>
          <Table.Rad>
            <th>Kundenummer</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>E-post</th>
            <th>Telefonnummer</th>
            <th>Fødselsdato</th>

            <th>Dato registrert</th>
          </Table.Rad>
          {this.kArray.slice(0, this.sideMengde).map(kunde => (
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
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    kundeService.getKunde(this.props.match.params.kundenr, kunde => {
      this.kArray = kunde;
    });
  }
  filter() {
    this.tekst = document.getElementById('input').value;
    this.ftekst = "%" + this.tekst + "%";

      kundeService.getKundeFilt(this.ftekst, this.ftekst, kundeF => {
        this.kArray = kundeF;
      });
    this.forceUpdate();
  }
  pages() {
    this.sideMengde = parseInt(document.getElementById('sidemengde').value);
    this.forceUpdate();
  }
}
