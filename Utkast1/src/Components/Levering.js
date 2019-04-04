import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import createHashHistory from 'history/createHashHistory';
import { ValidatorForm } from 'react-form-validator-core';


import { sykkelService } from '../Services/Sykkel';
import { kundeService } from '../Services/Kunde';
import { utstyrService } from '../Services/Utstyr';
import { ansattService } from '../Services/Ansatt';
import { bestillingsService } from '../Services/Bestilling';
import { utleieService } from '../Services/Utleie';
import { statistikkService } from '../Services/Statistikk';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table, TextValidator } from '../widgets';
const history = createHashHistory();

export class Levering extends Component {

  render() {
    return (
      <div className="mainView">
        <h2>Lever bestilling her:</h2>
          <NavCol.Link to="/utleie/levering/levering2">
            <input id="bildeInput5" type="image" src="https://images.all-free-download.com/images/graphiclarge/archive_icon_clip_art_9642.jpg" />
            <br />
          </NavCol.Link>

      </div>


    );
  }
}

export class Levering2 extends Component {
  bestillingsid = ""
  render() {
    return (
      <div className="mainView">
      <ValidatorForm
            ref="form"
            onSubmit ={this.levering}
        >
      <Card title="Lever her">
        <Form.Label>Bestillingsnummer:</Form.Label>
        <TextValidator
            onChange={event => (this.bestillingsid = event.target.value)}
            value={this.bestillingsid}
            validators={['required', 'isNumber']}
            errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke et gyldig bestillingsnummer']}
            className="form-control"
            autoFocus
        />
      </Card>
          <Button.Success2 onClick={this.levering} >Lever bestilling</Button.Success2>
        </ValidatorForm>
      </div>

    );
  }

  levering() {
        console.log(this.bestillingsid)
        utleieService.levering(
          this.bestillingsid,
          () => {
            history.push('/oversikt/bestilling');
          }
        );
      }
}
