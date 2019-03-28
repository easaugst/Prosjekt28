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

  totaltAntallSykler = 0; utleidAntallSykler = 0; restSykler = 0;

  totaltAntallUtstyr = 0; utleidAntallUtstyr = 0; restUtstyr = 0;


  render() {
    return (
      <div className="mainView">
      <Card title ="Lagerbeholdning for sykler">
        <div>
          <ProgressBar>
            <ProgressBar striped variant="success" now={this.restSykler} max={this.totaltAntallSykler} label={this.restSykler + " Ledige"} key={1} />
            <ProgressBar striped variant="danger" now={this.utleidAntallSykler} max={this.totaltAntallSykler} label={this.utleidAntallSykler + " Opptatt"} key={2} />
          </ProgressBar>
        </div>
      </Card>
      <Card title ="Lagerbeholdning for utstyr">
        <div>
          <ProgressBar>
            <ProgressBar striped variant="success" now={this.restUtstyr} max={this.totaltAntallUtstyr} label={this.restUtstyr + " Ledige"} key={1} />
            <ProgressBar striped variant="danger" now={this.utleidAntallUtstyr} max={this.totaltAntallUtstyr} label={this.utleidAntallUtstyr + " Opptatt"} key={2} />
          </ProgressBar>
        </div>
      </Card>
      </div>
    );
  }
  mounted() {
    //Sykkelstatistikk

    statistikkService.getSykkelAntall(sykkelTot => {
      this.totaltAntallSykler = parseInt(sykkelTot.substr(sykkelTot.lastIndexOf(':') + 1));
    });
    statistikkService.getSykkelUtleidAntall(sykkelUt => {
      this.utleidAntallSykler = parseInt(sykkelUt.substr(sykkelUt.lastIndexOf(':') + 1));
      this.restSykler = this.totaltAntallSykler-this.utleidAntallSykler;
    });
    //Utstyrstatistikk

    statistikkService.getUtstyrAntall(utstyrTot => {
      this.totaltAntallUtstyr = parseInt(utstyrTot.substr(utstyrTot.lastIndexOf(':') + 1));
    });
    statistikkService.getUtstyrUtleidAntall(utstyrUt => {
      this.utleidAntallUtstyr = parseInt(utstyrUt.substr(utstyrUt.lastIndexOf(':') + 1));
      this.restUtstyr = this.totaltAntallUtstyr-this.utleidAntallUtstyr;
    });
  }

}
