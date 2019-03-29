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

export class Registrering extends Component {
  render() {
    return (
      <div className="mainView">
        <div id="mainViewSide1">
          <NavCol.Link id="bildeInput1" to="/registrering/kunde">
            <input className="bildeInput" type="image" src="http://cdn.onlinewebfonts.com/svg/img_385846.png" />
            <br />
            <p>Registrer kunde</p>
          </NavCol.Link>
          <NavCol.Link to="/registrering/sykkel">
            <input className="bildeInput" type="image" src="https://upload.wikimedia.org/wikipedia/commons/d/db/USDOT_highway_sign_bicycle_symbol_-_black.svg" />
            <br />
            <p>Registrer sykkel</p>
          </NavCol.Link>
        </div>
      </div>
    )
  }
}

export class RegVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/registrering/kunde">
          <ion-icon name="person-add" />
          Registrere kunde
        </NavCol.Link>

        <NavCol.Link to="/registrering/sykkel">
          <ion-icon name="bicycle" />
          Registrere sykkel
        </NavCol.Link>

        <NavCol.Link to="/registrering/utstyr">
          <ion-icon name="cube" />
          Registrere utstyr
        </NavCol.Link>

        <NavCol.Link to="/registrering/ansatt">
          <ion-icon name="contacts" />
          Registrere ansatt
        </NavCol.Link>
      </NavCol>
    );
  }
}
