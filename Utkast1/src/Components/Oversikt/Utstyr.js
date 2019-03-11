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
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
const history = createHashHistory();

export class UtstyrOversikt extends Component {
  uArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Utstyrsnr</th>
            <th>Utstyrstype</th>
            <th>Status</th>
          </Table.Rad>
          {this.uArray.map((utstyr /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
            <Table.Rad key={utstyr.utstyrsid}>
              <td>{utstyr.utstyrsid}</td>
              <td>{utstyr.navn}</td>
              <td>{utstyr.ustatus}</td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyr(this.props.match.params.utstyrsid, utstyr => {
      this.uArray = utstyr;
    });
  }
}
