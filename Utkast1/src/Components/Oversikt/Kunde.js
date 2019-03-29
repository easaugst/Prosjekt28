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
  sideMengde = 25; sider = []; aktivSide = 0;
  sisteSide = '';
  kunder = '';

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
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
            <Button.Light onClick={this.pageSwitchH}>Første Side</Button.Light>
            <Button.Light onClick={this.pageSwitchP}>Forrige Side</Button.Light>
            <Button.Light onClick={this.pageSwitchN}>Neste Side</Button.Light>
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
              {this.kArray.slice(mengde.forrigeSide, mengde.sideMengde).map(kunde => (
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
        ))}
      </div>
    );
  }
  mounted() {
    kundeService.countKunder(kunder => {
      this.kunder = parseInt(kunder.substr(kunder.lastIndexOf(':') + 1));
      console.log(this.kunder);
      this.kundeSortering();
    });
    kundeService.getKunde(kunde => {
      this.kArray = kunde;
    });
  }
  filter() {
    this.tekst = document.getElementById('input').value;
    this.ftekst = "%" + this.tekst + "%";

      kundeService.getKundeFilt(this.ftekst, this.ftekst, kundeF => {
        this.kArray = kundeF;
      });
    this.pageSwitchH();
    this.forceUpdate();
  }
  pages() {
    this.sideMengde = parseInt(document.getElementById('sidemengde').value);
    kundeService.getKunde(kunde => {
      this.kArray = kunde;
    });
    this.kundeSortering();
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

  kundeSortering() {
    if (this.kunder > this.sideMengde) {
      this.sisteSide = this.kunder % this.sideMengde;
      this.kunder -= this.sisteSide;
      console.log(this.kunder, this.sisteSide);
      for (var i = 1; i <= (this.kunder / this.sideMengde + 1); i++) {
        if (i == (this.kunder / this.sideMengde + 1)) {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide});
          console.log('Siste side: ' + this.sisteSide);
        } else {
          if (this.sider.length == 0) {
            this.sider.push({ forrigeSide: 0, sideMengde: i * this.sideMengde });
            console.log('Første side opprettet: ', this.sider[0]);
          } else {
            this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde })
          }
        }
      }
      console.log(this.sider);
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
    }
  }
}
