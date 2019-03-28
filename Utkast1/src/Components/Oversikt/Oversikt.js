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
        {' '}
        Reg hva du vil
        <div class="container">
          <h2>Fullfør bestilling</h2>
          <button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#myModal">
            Fullfør bestilling
          </button>

          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <p>Bestillingen er fullført</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">
                    Lukk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    );
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
          <ion-icon name="contacts" />
          Ansatt
        </NavCol.Link>
      </NavCol>
    );
  }
}
