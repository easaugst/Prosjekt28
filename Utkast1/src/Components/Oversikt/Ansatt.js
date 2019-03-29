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
  ftekst = "";
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  ansatte = '';

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
      {this.sider.map(mengde => (
        <div id={'side' + mengde.sideMengde} key={mengde.sideMengde.toString()}>
        <Button.Light onClick={this.pageSwitchH}>Første Side</Button.Light>
        <Button.Light onClick={this.pageSwitchP}>Forrige Side</Button.Light>
        <Button.Light onClick={this.pageSwitchN}>Neste Side</Button.Light>
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
              {this.aArray.slice(mengde.forrigeSide, mengde.sideMengde).map(ansatt => (
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
        ))}
      </div>
    );
  }
  mounted() {
    ansattService.countAnsatt(ansatte => {
      this.ansatte = parseInt(ansatte.substr(ansatte.lastIndexOf(':') + 1));
      console.log(this.ansatte);
      this.ansattSortering();
    })
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
    this.pageSwitchH();
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

  ansattSortering() {
    if (this.ansatte > this.sideMengde) {
      this.sisteSide = this.ansatte % this.sideMengde;
      this.ansatte -= this.sisteSide;
      console.log(this.ansatte, this.sisteSide);
    }
    for (var i = 1; i <= (this.ansatte / this.sideMengde + 1); i++) {
      if (i == (this.ansatte / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });
          console.log('Første side opprettet:', this.sider[0]);
        } else {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde })
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
  }
}
