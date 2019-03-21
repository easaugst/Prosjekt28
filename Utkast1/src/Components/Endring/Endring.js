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
    return <div className="mainView">Her kan vi endre informasjonen på registreringer</div>;
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
          <ion-icon name="contacts" />
          Endre ansatt
        </NavCol.Link>
      </NavCol>
    );
  }
}
