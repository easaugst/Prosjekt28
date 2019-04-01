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

export class Endring extends Component {
  render() {
    return (
      <div className="mainView">
      <h2>Velg hva du ønsker å endre</h2>
        <div id="mainViewSide5">
          <NavCol.Link to="/endring/bestillinger">
            <input id="bildeInput5" type="image" src="http://cdn.onlinewebfonts.com/svg/img_369247.png" />
            <br />
            <p>Endre bestilling</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide6">
          <NavCol.Link to="/endring/kunde">
            <input id="bildeInput6" type="image" src="https://image.flaticon.com/icons/svg/686/686348.svg" />
            <br />
            <p>Endre kundeinformasjon</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide7">
          <NavCol.Link to="/endring/sykkel">
            <input id="bildeInput7" type="image" src="https://upload.wikimedia.org/wikipedia/commons/d/db/USDOT_highway_sign_bicycle_symbol_-_black.svg" />
            <br />
            <p>Endre sykkel</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide8">
          <NavCol.Link to="/endring/utstyr">
            <input id="bildeInput8" type="image" src="http://cdn.onlinewebfonts.com/svg/img_547.png" />
            <br />
            <p>Endre utstyr</p>
          </NavCol.Link>
        </div>
        <div id="mainViewSide9">
          <NavCol.Link to="/endring/ansatt">
            <input id="bildeInput9" type="image" src="https://png.pngtree.com/svg/20170116/ad3dddaf9c.svg" />
            <br />
            <p>Endre ansatt</p>
          </NavCol.Link>
        </div>
      </div>
    )
  }
}

export class EndringVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/endring/bestillinger">
          {' '}
          <ion-icon name="create" />
          Endre bestilling
        </NavCol.Link>

        <NavCol.Link to="/endring/kunde">
          <ion-icon name="people" />
          Endre kundeinformasjon
        </NavCol.Link>

        <NavCol.Link to="/endring/sykkel">
          {' '}
          <ion-icon name="bicycle" />
          Endre sykkel
        </NavCol.Link>

        <NavCol.Link to="/endring/utstyr">
          <ion-icon name="cube" />
          Endre utstyr
        </NavCol.Link>
        <NavCol.Link to="/endring/ansatt">
          <ion-icon name="contact" />
          Endre ansatt
        </NavCol.Link>
      </NavCol>
    );
  }
}
