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

export class Oversikt extends Component {
  render() {
    return (
      <div className="mainView">
      <h2>Velg hva du ønsker oversikt over</h2>
        <div id="mainViewSide5">
          <NavCol.Link to="/oversikt/bestilling">
            <input id="bildeInput5" type="image" src="http://cdn.onlinewebfonts.com/svg/img_369247.png" />
            <br />
            <p>Bestillinger</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide6">
          <NavCol.Link to="/oversikt/kunde">
            <input id="bildeInput6" type="image" src="https://image.flaticon.com/icons/svg/686/686348.svg" />
            <br />
            <p>Kundeinformasjon</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide7">
          <NavCol.Link to="/oversikt/sykkel">
            <input id="bildeInput7" type="image" src="https://upload.wikimedia.org/wikipedia/commons/d/db/USDOT_highway_sign_bicycle_symbol_-_black.svg" />
            <br />
            <p>Sykler</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide8">
          <NavCol.Link to="/oversikt/utstyr">
            <input id="bildeInput8" type="image" src="http://cdn.onlinewebfonts.com/svg/img_547.png" />
            <br />
            <p>Utstyr</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide9">
          <NavCol.Link to="/oversikt/ansatt">
            <input id="bildeInput9" type="image" src="https://png.pngtree.com/svg/20170116/ad3dddaf9c.svg" />
            <br />
            <p>Ansatte</p>
          </NavCol.Link>
        </div>
      </div>
    )
  }
}

export class OversiktVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/oversikt/bestilling">
          {' '}
          <ion-icon name="create" />
          Bestilling
        </NavCol.Link>

        <NavCol.Link to="/oversikt/kunde">
          <ion-icon name="people" className="bootStrapIkon" />
          Kunde
        </NavCol.Link>

        <NavCol.Link to="/oversikt/sykkel">
          <ion-icon name="bicycle" />
          Sykkel
        </NavCol.Link>

        <NavCol.Link to="/oversikt/utstyr">
          <ion-icon name="cube" />
          Utstyr
        </NavCol.Link>
        <NavCol.Link to="/oversikt/ansatt">
          <ion-icon name="contact" />
          Ansatt
        </NavCol.Link>
        <NavCol.Link to="/oversikt/lokasjon">
          <ion-icon name="business" />
          Lokasjoner
        </NavCol.Link>
      </NavCol>
    );
  }
}
