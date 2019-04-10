//Se ./Ansatt for flere kommentarer på koden

import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ValidatorForm } from 'react-form-validator-core';

import { sykkelService } from '../../Services/Sykkel';
import { kundeService } from '../../Services/Kunde';
import { utstyrService } from '../../Services/Utstyr';
import { ansattService } from '../../Services/Ansatt';
import { bestillingsService } from '../../Services/Bestilling';
import { utleieService } from '../../Services/Utleie';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table, TextValidator } from '../../widgets';
const history = createHashHistory();

export class BestillingsEndring extends Component {
  bArray = [];    //Inneholder bestillinger hentet fra databasen. Brukes for .map() av tabell

  //sideMengde, sider, aktivSide og sisteSide brukes til å dele tabelloversikten inn i flere sider. 'sider' brukes for .map() av sidene
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  bestillinger = '';   //Antall bestillinger lagres her. Brukes til å dele tabelloversikten inn i flere sider

  render() {
    return (
      <div className="mainView">
      <div className="filterView">
        <Form.Label>Filtrér:</Form.Label>
        <Form.Input id="input" onChange={this.filter} placeholder="Skriv inn navn"></Form.Input>
      </div>
        {/*  Se ./Ansatt  */}
        {this.sider.map(mengde => (
          <div id={'side' + mengde.sideMengde} key={mengde.sideMengde.toString()}>
            <div className="sideKnapper">
              <span className="sideKnapp1">
                <Button.Primary onClick={this.pageSwitchH}>Første Side</Button.Primary>
              </span>
              <span className="sideKnapp2">
                <Button.Primary onClick={this.pageSwitchP}>Forrige Side</Button.Primary>
              </span>
              <span className="sideKnapp3">
                <Button.Primary onClick={this.pageSwitchN}>Neste Side</Button.Primary>
              </span>
              <span className="sideKnapp4">
                <Button.Primary onClick={this.pageSwitchL}>Siste Side</Button.Primary>
              </span>
            </div>
            <Table>
              <Table.Rad>
                <th>Bestilling</th>
                <th>Kunde</th>
                <th>Ansatt</th>
                <th>Status</th>
                <th>Utleiested</th>
                <th>Utleietype</th>
                <th>Betalingsmåte</th>
                <th>Tidspunkt bestilling</th>
                <th>Fra</th>
                <th>Til</th>
                <th>Type bestilling</th>
                <th>Rediger</th>
                <th>Levering</th>
              </Table.Rad>
              {/*  Se ./Ansatt  */}
              {this.bArray.slice(mengde.forrigeSide, mengde.sideMengde).map(bestilling => (
                <Table.Rad key={bestilling.bestillingsid}>
                  <td>{bestilling.bestillingsid}</td>
                  <td>{bestilling.kundenr}</td>
                  <td>{bestilling.ansattnr}</td>
                  <td>{bestilling.status}</td>
                  <td>{bestilling.utleiested}</td>
                  <td>{bestilling.utleietype}</td>
                  <td>{bestilling.kontant}</td>
                  <td>
                    {/*  Viser tid i lokal tidssone. Fjerner ',' og siste tegnene fra strengen  */}
                    {bestilling.btid.toLocaleString()
                    .replace(/,/g, '')
                    .slice(0, -3)}
                  </td>
                  <td>
                    {/*  Se over  */}
                    {bestilling.ftid.toLocaleString()
                    .replace(/,/g, '')
                    .slice(0, -3)}
                  </td>
                  <td>
                    {/*  Se over  */}
                    {bestilling.ttid.toLocaleString()
                    .replace(/,/g, ' ')
                    .slice(0, -3)}
                  </td>
                  <td>{bestilling.gruppe}</td>
                  <td>
                    <List.Item to={'/endring/bestilling/' + bestilling.bestillingsid}>Hovedbestilling</List.Item>
                    <List.Item to={'/endring/bestilling/2/' + bestilling.bestillingsid}>Underbestillinger</List.Item>
                  </td>
                  <td>
                    <List.Item to={'/endring/levering/' + bestilling.bestillingsid}>Lever</List.Item>
                  </td>
                </Table.Rad>
              ))}
            </Table>
          </div>
        ))}
      </div>
    );
  }

  mounted() {
    window.scrollTo(0, 0);
    bestillingsService.countBestilling(bestilling => {
      this.bestillinger = parseInt(bestilling.substr(bestilling.lastIndexOf(':') + 1));
      console.log(this.bestillinger);
      this.bestillingSortering();
    });
    bestillingsService.getBestilling(bestilling => {
      this.bArray = bestilling;
    });
  }
  filter() {    //Lik som for Ansatt
    var tekst = document.getElementById('input').value;
    tekst = "%" + tekst + "%";
    bestillingsService.getBestillingFilt(tekst, bestillingF => {
      this.bArray = bestillingF;
    });
    this.pageSwitchH();
    this.forceUpdate();
  }
  pageSwitch(retning) {
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
    document.getElementById('side' + this.sider[retning].sideMengde).style.display = 'block';

  }
    pageSwitchH() {
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
      this.aktivSide = 0;
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
    }
    pageSwitchN() {
      if (this.aktivSide < this.sider.length - 1) {
        this.pageSwitch(this.aktivSide + 1)
        this.aktivSide++;
      }
    }
    pageSwitchP() {
      if (this.aktivSide > 0) {
        this.pageSwitch(this.aktivSide - 1);
        this.aktivSide--;
      }
    }
    pageSwitchL() {
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'none';
      this.aktivSide = this.sider.length - 1;
      document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
    }

  bestillingSortering() {   //Lager "reglene" for sideinndeling. Se ./Ansatt
    if (this.bestillinger > this.sideMengde) {
      this.sisteSide = this.bestillinger % this.sideMengde;
      this.bestillinger -= this.sisteSide;
      console.log(this.bestillinger, this.sisteSide);
    }
    for (var i = 1; i <= (this.bestillinger / this.sideMengde + 1); i++) {
      if (i == (this.bestillinger / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: (i - 1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });
          console.log('Første side opprettet:', this.sider[0]);
        } else {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde });
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
  }
}

export class BestillingsEndringMeny extends Component {
  bestillingsid = '';
  bestilling = [];
  utleiested = '';
  utleietype = null;
  gruppe = null;
  kontant = null;
  kundenr = '';

  render() {
    return (
      <div>
        <div className="mainView">
          {this.bestilling.map(bestilling => (
            <Card title={'Rediger bestilling ' + this.bestillingsid} key={bestilling.detaljer}>
              <Form.Label>Kundenr:</Form.Label>
              <Form.Input
                type="text"
                id="kundeInput"
                value={this.kundenr}
                placeholder={bestilling.kundenr}
                onChange={event => (this.kundenr = event.target.value)}
              />

              <Form.Label>Utleiested:</Form.Label>
              <Form.Input
                type="text"
                id="utleiestedInput"
                value={this.utleiested}
                placeholder={bestilling.utleiested}
                onChange={event => (this.utleiested = event.target.value)}
              />

              <Form.Label>Utleietype:</Form.Label>
              <select
                className="form-control"
                id="utleieInput"
                value={bestilling.utleietype}
                onChange={event => (bestilling.utleietype = event.target.value)}
              >
                <option value="1">Timesleie</option>
                <option value="2">Dagsleie</option>
                <option value="3">3-dagersleie</option>
                <option value="4">Ukesleie</option>
              </select>

              <Form.Label>Endre betalingsmåte:</Form.Label>
              <select
                className="form-control"
                id="kontantInput"
                value={bestilling.kontant}
                onChange={event => (bestilling.kontant = event.target.value)}
              >
                <option value="Kort">Kort</option>
                <option value="Kontant">Kontant</option>
              </select>

              <Form.Label>Gruppe:</Form.Label>
              <select
                className="form-control"
                id="gruppeInput"
                value={bestilling.gruppe}
                onChange={event => (bestilling.gruppe = event.target.value)}
              >
                <option value="Gruppe">Ja</option>
                <option value="Enkel">Nei</option>
              </select>
            </Card>
          ))}
          <br />
          <div className="knapper">
            <span className="tilbakeMeny2">
              <Button.Success onClick={this.save}>Lagre endring</Button.Success>
            </span>
            <span className="tilbakeMeny">
              <Button.Primary onClick={this.cancel}>Avbryt endring</Button.Primary>
            </span>
            <span className="tilbakeMeny">
              <Button.Danger onClick={this.slett}>Slett hovedbestilling</Button.Danger>
            </span>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    this.bestillingsid = this.props.match.params.bestillingsid;
    bestillingsService.getBestillingEndring(this.bestillingsid, bestilling => {
      this.bestilling = bestilling;
    });
    console.log(this.kundenr);
  }
  save() {
    if (document.getElementById('kundeInput').value === '') {
      this.kundenr = this.bestilling[0].kundenr;
      console.log(this.kundenr);
    }
    if (document.getElementById('utleiestedInput').value === '') {
      this.utleiested = this.bestilling[0].utleiested;
      console.log(this.utleiested);
    }
    if (this.utleietype === null) {
      this.utleietype = this.bestilling[0].utleietype;
      console.log(this.utleietype);
    }
    if (this.kontant === null) {
      this.kontant = this.bestilling[0].kontant;
      console.log(this.kontant);
    }
    if (this.gruppe === null) {
      this.gruppe = this.bestilling[0].gruppe;
      console.log(this.gruppe);
    }
    bestillingsService.updateBestilling(this.kundenr, this.utleiested, this.utleietype, this.kontant, this.gruppe, this.bestillingsid, () => {
        history.push('/endring/bestillinger');
      }
    );
  }
  cancel() {
    history.goBack();
  }
  slett() {   //Sletter bestillingen fra databasen hvis brukeren er administrator. Endrer status på utstyr og sykler til "Lager".
    if (window.admin == true) {
      bestillingsService.getAlleSykler(this.props.match.params.bestillingsid, sykler => {
        console.log(sykler);
        for (var i = 0; i < sykler.length; i++) {   //Kjører ikke før databasen har gitt svar til .getAlleSykler(...)
          bestillingsService.updateSykkel(sykler[i].regnr, () => {})
          console.log('Oppdatert: ' + sykler.regnr);
        }
        bestillingsService.getAltUtstyr(this.props.match.params.bestillingsid, utstyr => {    //Kjører ikke før databasen har gitt svar til .getAlleSykler(...)
          for (var i = 0; i < utstyr.length; i++) {   //Kjører først når databasen har gitt svar til .getAltUtstyr(...)
            bestillingsService.updateUtstyr(utstyr[i].utstyrsid, () => {})
            console.log('Oppdatert: ' + utstyr.utstyrsid);
          }
          bestillingsService.slettAlleUbestilling(this.props.match.params.bestillingsid, () => { //Kjører først når databasen har gitt svar til .getAltUtstyr(...)
            history.goBack();
          });
        });
        bestillingsService.slettBestilling(this.props.match.params.bestillingsid, () => {});    //Kjører først når databasen har gitt svar til .getAlleSykler(...)
      });
    } else {
      alert(window.tbm);
    }
  }
}

export class UbestillingsEndringMeny extends Component {
  //Fungerer på samme måte som BestillingsEndring
  dbArray = [];
  ubid = '';
  bid = '';

  render() {
    return (
      <div>
        <div className="mainView">
          <Table>
            <Table.Rad>
              <th>Bestillingsnummer</th>
              <th>Delbestillingsnummer</th>
              <th>Registreringsnummer</th>
              <th>Utstyrs ID</th>
              <th>Type</th>
              <th>Rediger</th>
            </Table.Rad>
            {this.dbArray.map(delbestilling => (
              <Table.Rad key={delbestilling.ubid}>
                <td>{delbestilling.bestillingsid}</td>
                <td>{delbestilling.ubid}</td>
                <td>{delbestilling.regnr}</td>
                <td>{delbestilling.utstyrsid}</td>
                <td>{delbestilling.utnavn}</td>
                <td>
                  <List.Item to={'/endring/bestilling/3/' + delbestilling.ubid}>Rediger</List.Item>
                </td>
              </Table.Rad>
            ))}
          </Table>
          <span className="tilbakeMeny2">
            <Button.Primary onClick={this.cancel}>Tilbake</Button.Primary>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    bestillingsService.getDelbestilling(this.props.match.params.bestillingsid, delbestilling => {
      this.dbArray = delbestilling;
    });
  }
  cancel() {
    history.goBack();
  }
}

export class UbestillingsEndring extends Component {
  dbArray = [];
  ubid = '';
  regnr = '';
  utstyrsid = '';
  detaljer = '';
  bestillingsid = '';

  render() {
    return (
      <div>
        <div className="mainView">
          {this.dbArray.map(delbestiling => (
            <Card title={'Rediger delbestilling ' + delbestiling.ubid} key={delbestiling.detaljer}>
              <Form.Label>Bestillingsid:</Form.Label>
              <Form.Input
                type="text"
                id="bestillingsid"
                value={this.bestillingsid}
                placeholder={delbestiling.bestillingsid}
                onChange={event => (this.bestillingsid = event.target.value)}
              />
              <Form.Label>Registreringsnummer:</Form.Label>
              <Form.Input
                type="text"
                id="regnr"
                value={this.regnr}
                placeholder={delbestiling.regnr}
                onChange={event => (this.regnr = event.target.value)}
              />
              <Form.Label>Utsyrsid:</Form.Label>
              <Form.Input
                type="text"
                id="utstyrsid"
                value={this.utsyrsid}
                placeholder={delbestiling.utstyrsid}
                onChange={event => (this.utstyrsid = event.target.value)}
              />
              <Form.Label>Detaljer:</Form.Label>
              <Form.Input
                type="text"
                id="detaljer"
                value={this.detaljer}
                placeholder={delbestiling.detaljer}
                onChange={event => (this.detaljer = event.target.value)}
              />
            </Card>
          ))}
          <br />
          <div className="knapper">
            <span className="tilbakeMeny2">
              <Button.Success onClick={this.save}>Lagre endring</Button.Success>
            </span>
            <span className="tilbakeMeny">
              <Button.Primary onClick={this.cancel}>Avbryt endring</Button.Primary>
            </span>
            <span className="tilbakeMeny">
              <Button.Danger onClick={this.slett}>Slett delbestilling</Button.Danger>
            </span>
          </div>
        </div>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
    this.ubid = this.props.match.params.bestillingsid;
    bestillingsService.getDelbestillingEndring(this.ubid, delbestilling => {
      this.dbArray = delbestilling;
    });
  }
  save() {
    this.sjekkFelt();
    bestillingsService.updateUbestilling(this.regnr, this.utstyrsid, this.detaljer, this.bestillingsid, this.ubid, () => {
        history.goBack();
        console.log(this.regnr, this.utstyrsid, this.detaljer, this.bestillingsid, this.ubid);
      }
    );
  }
  cancel() {
    history.goBack();
  }

  sjekkFelt() {
    if (document.getElementById('regnr').value === '') {
      this.regnr = this.dbArray[0].regnr;
    }
    if (document.getElementById('utstyrsid').value === '') {
      this.utstyrsid = this.dbArray[0].utstyrsid;
    }
    if (document.getElementById('detaljer').value === '') {
      this.detaljer = this.dbArray[0].detaljer;
    }
    if (document.getElementById('bestillingsid').value === '') {
      this.bestillingsid = this.dbArray[0].bestillingsid;
    }
  }
  slett() {   //Sletter delbestillingen fra databasen hvis brukeren er administrator
    if (window.admin == true) {
      bestillingsService.slettUbestilling(this.ubid, () => {
        history.goBack();
      });
    } else {
      alert(window.tbm);
    }
  }
}

export class Levering extends Component {
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
            onChange={event => (this.bestillingsid = event.target.value)}
            validators={['required', 'isNumber']}
            placeholder={this.bestillingsid}
            errorMessages={['Dette feltet kan ikke stå tomt', 'Ikke et gyldig bestillingsnummer']}
            className="form-control"
            autoFocus
        />
      </Card>
      <br />
      <div className="knapper">
        <span className="tilbakeMeny2">
          <Button.Success2 onClick={this.levering} >Lever bestilling</Button.Success2>
        </span>
        <span className="tilbakeMeny">
          <Button.Primary onClick={this.cancel}>Avbryt endring</Button.Primary>
        </span>
        </div>
        </ValidatorForm>
      </div>
    );
  }
  mounted() {
    window.scrollTo(0, 0);
  }

  levering() {
    console.log(this.props.match.params.bestillingsid);
    bestillingsService.levering(this.props.match.params.bestillingsid, () => {   //"Leverer" bestillingen. Markeres som inaktiv i databasen
        history.push('/oversikt/bestilling');
    });
  }
  cancel() {
    history.goBack();
  }
}
