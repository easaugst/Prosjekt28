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
      <Card title="Lagerbeholdning">
        <div className="container">
          <h2>Oversikt over Lagerbeholdning</h2>
          <div id="myCarousel" className="carousel slide">
            <ol className="carousel-indicators">
              <li className="item1 active" />
              <li className="item2" />
              <li className="item3" />
              <li className="item4" />
            </ol>

            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <Card title="Lagerbeholdning for sykler">
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
                </Card>{' '}
                <div className="carousel-caption">
                  <h3>Sykler</h3>
                </div>
              </div>

              <div className="item">
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
                </Card>{' '}
                <div className="carousel-caption">
                  <h3>Utstyr</h3>
                </div>
              </div>

              <div className="item">
                <Card title="Lagerbeholdning for kunder">
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
                </Card>{' '}
                <div className="carousel-caption">
                  <h3>Kunder</h3>
                </div>
              </div>

              <div className="item">
                <Card title="Lagerbeholdning for bestillinger">
                  <div>
                    <ProgressBar>
                      <ProgressBar
                        striped
                        variant="success"
                        now={this.antallBestillinger}
                        max={this.antallBestillinger * 1.5}
                        label={this.antallBestillinger + ' bestillinger'}
                        key={1}
                      />
                    </ProgressBar>
                  </div>
                </Card>{' '}
                <div className="carousel-caption">
                  <h3>Bestillinger</h3>
                </div>
              </div>
            </div>

            <a className="left carousel-control" href="#myCarousel" role="button">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" role="button">
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </Card>
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

$(document).ready(function() {
  // Activate Carousel
  $('#myCarousel').carousel();

  // Enable Carousel Indicators
  $('.item1').click(function() {
    $('#myCarousel').carousel(0);
  });
  $('.item2').click(function() {
    $('#myCarousel').carousel(1);
  });
  $('.item3').click(function() {
    $('#myCarousel').carousel(2);
  });
  $('.item4').click(function() {
    $('#myCarousel').carousel(3);
  });

  // Enable Carousel Controls
  $('.left').click(function() {
    $('#myCarousel').carousel('prev');
  });
  $('.right').click(function() {
    $('#myCarousel').carousel(1);
  });
});
