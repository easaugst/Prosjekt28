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

export class Levering extends Component {

  render() {
    return (
      <div className="mainView">
        <h2>Lever bestilling her:</h2>
          <NavCol.Link to="/utleie/levering/nyside">
            <input id="bildeInput5" type="image" src="http://cdn.onlinewebfonts.com/svg/img_152088.png" />
            <br />
          </NavCol.Link>

      </div>


    );
  }
  mounted() {

  }
  levering() {

  }
}

export class Levering2 extends Component {

  render() {
    return (
      <div className="mainView">
        <button>Lever bestilling</button>
      </div>


    );
  }
  mounted() {

  }
  levering() {

  }
}
