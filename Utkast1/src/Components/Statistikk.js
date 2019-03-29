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

  totaltAntallSykler = 0;
  utleidAntallSykler = 0;
  restSykler = 0;

  totaltAntallUtstyr = 0;
  utleidAntallUtstyr = 0;
  restUtstyr = 0;

  antallBestillinger = 0;

  antallKunder = 0;

  render() {
    return (
      <div className="mainView">
      <div className="justify-content-center">
        <div className="col-auto mb-3">
        <Card title="Lagerbeholdning for sykler">
          <div>
            <ProgressBar>
              <ProgressBar
                striped
                variant="success"
                now={this.restSykler}
                max={this.totaltAntallSykler}
                label={this.restSykler + ' Ledige'}
                key={1}
              />
            <ProgressBar
                striped
                variant="danger"
                now={this.utleidAntallSykler}
                max={this.totaltAntallSykler}
                label={this.utleidAntallSykler + ' Opptatt'}
                key={2}
              />
          </ProgressBar>
        </div>
      </Card></div>
      <div className="col-auto mb-">
          <Card title="Lagerbeholdning for utstyr">
          <div>
            <ProgressBar>
              <ProgressBar
                striped
                variant="success"
                now={this.restUtstyr}
                max={this.totaltAntallUtstyr}
                label={this.restUtstyr + ' Ledige'}
                key={1}
              />
            <ProgressBar
                striped
                variant="danger"
                now={this.utleidAntallUtstyr}
                max={this.totaltAntallUtstyr}
                label={this.utleidAntallUtstyr + ' Opptatt'}
                key={2}
                />
              </ProgressBar>
            </div>
          </Card>
        </div>

      <div className="col-auto mb-3">
      <Card title="Antall registrerte kunder">
        <div>
          <ProgressBar>
            <ProgressBar
              striped
              variant="success"
              now={this.antallKunder}
              max={this.antallKunder * 1.4}
              label={this.antallKunder + ' kunder'}
              key={1}
            />
          </ProgressBar>
        </div>
      </Card>
      </div>
      <div className="col-auto mb-3">
        <Card title="Antall registrerte bestillinger">
          <div>
            <ProgressBar>
              <ProgressBar
                striped
                variant="success"
                now={this.antallBestillinger}
                max={this.antallBestillinger * 1.5}
                label={this.antallBestillinger + ' bestillinger'}
                key={2}
              />
            </ProgressBar>
          </div>
        </Card>
      </div>
      </div>
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
      this.restSykler = this.totaltAntallSykler - this.utleidAntallSykler;
    });
    //Utstyrstatistikk

    statistikkService.getUtstyrAntall(utstyrTot => {
      this.totaltAntallUtstyr = parseInt(utstyrTot.substr(utstyrTot.lastIndexOf(':') + 1));
    });
    statistikkService.getUtstyrUtleidAntall(utstyrUt => {
      this.utleidAntallUtstyr = parseInt(utstyrUt.substr(utstyrUt.lastIndexOf(':') + 1));
      this.restUtstyr = this.totaltAntallUtstyr - this.utleidAntallUtstyr;
    });

    //kundestatistikk

    statistikkService.antallKunder(kunderTot => {
      this.antallKunder = parseInt(kunderTot.substr(kunderTot.lastIndexOf(':') + 1));
    });

    //Bestillingstatistikk
    statistikkService.antallBestillinger(bestillingTot => {
      this.antallBestillinger = parseInt(bestillingTot.substr(bestillingTot.lastIndexOf(':') + 1));
    });
  }
}
