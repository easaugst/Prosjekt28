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
      <h2>Velg hva du ønsker å registrere</h2>
        <div id="mainViewSide1">
          <NavCol.Link to="/registrering/kunde">
            <input id="bildeInput1" type="image" src="http://cdn.onlinewebfonts.com/svg/img_385846.png" />
            <br />
            <p>Registrer kunde</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide2">
          <NavCol.Link to="/registrering/sykkel">
            <input id="bildeInput2" type="image" src="https://upload.wikimedia.org/wikipedia/commons/d/db/USDOT_highway_sign_bicycle_symbol_-_black.svg" />
            <br />
            <p>Registrer sykkel</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide3">
          <NavCol.Link to="/registrering/utstyr">
            <input id="bildeInput3" type="image" src="http://cdn.onlinewebfonts.com/svg/img_547.png" />
            <br />
            <p>Registrer utstyr</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide4">
          <NavCol.Link to="/registrering/ansatt">
            <input id="bildeInput4" type="image" src="https://png.pngtree.com/svg/20170116/ad3dddaf9c.svg" />
            <br />
            <p>Registrer ansatt</p>
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
          <ion-icon name="contact" />
          Registrere ansatt
        </NavCol.Link>
      </NavCol>
    );
  }
}
