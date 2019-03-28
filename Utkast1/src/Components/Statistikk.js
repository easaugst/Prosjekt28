import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import createHashHistory from 'history/createHashHistory';

import { sykkelService } from '../Services/Sykkel';
import { kundeService } from '../Services/Kunde';
import { utstyrService } from '../Services/Utstyr';
import { ansattService } from '../Services/Ansatt';
import { bestillingsService } from '../Services/Bestilling';
import { utleieService } from '../Services/Utleie';
import { statistikkService } from '../Services/Statistikk';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../widgets';
const history = createHashHistory();

export class Statistikk extends Component {

  sArray = [];
  stArray = [];

  totaltAntall = 0;
  utleidAntall = 0;
  rest = 0;

  render() {
    return (
      <div className="mainView">
      <Card title ="Lagerbeholdning for sykler">
        <div>
          <ProgressBar>
            <ProgressBar striped variant="success" now={this.rest} max={this.totaltAntall} label={this.rest + " Ledige"} key={1} />
            <ProgressBar striped variant="danger" now={this.utleidAntall} max={this.totaltAntall} label={this.utleidAntall + " Opptatt"} key={2} />
          </ProgressBar>
        </div>
      </Card>
      </div>
    );
  }
  mounted() {
    statistikkService.getSykkelAntall(sykkelTot => {
      this.totaltAntall = parseInt(sykkelTot.substr(sykkelTot.lastIndexOf(':') + 1));
    });
    statistikkService.getSykkelUtleidAntall(sykkelUt => {
      this.utleidAntall = parseInt(sykkelUt.substr(sykkelUt.lastIndexOf(':') + 1));
      this.rest = this.totaltAntall-this.utleidAntall;
    });
  }

}
