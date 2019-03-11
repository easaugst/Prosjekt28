import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { sykkelService } from './Services/Sykkel';
import { kundeService } from './Services/Kunde';
import { utstyrService } from './Services/Utstyr';
import { ansattService } from './Services/Ansatt';
import { bestillingsService } from './Services/Bestilling';
import { utleieService } from './Services/Utleie';

import { Oversikt, OversiktVertMenu } from './Components/Oversikt/Oversikt'
import { AnsattOversikt } from './Components/Oversikt/Ansatt';
import { KundeOversikt } from './Components/Oversikt/Kunde';
import { BestillingOversikt } from './Components/Oversikt/Bestilling';
import { SykkelOversikt } from './Components/Oversikt/Sykkel';
import { UtstyrOversikt } from './Components/Oversikt/Utstyr';


import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from './widgets';
import { Dropdown } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';
const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Sykkelutleie 9000">
        {' '}
        {/*Container for den  horisontale navigjasjonsmenyen, inneholder applikasjonsnavn som presenteres som "Home"*/}
        <NavBar.Link to="/oversikt">Oversikt</NavBar.Link> {/*Navbar.Link er hvert alternativ i menyen*/}
        <NavBar.Link to="/utleie">Utleie</NavBar.Link>
        <NavBar.Link to="/endring">Endring</NavBar.Link>
        <NavBar.Link to="/registrering">Registrering</NavBar.Link>
      </NavBar>
    );
  }
}

class Utleie extends Component {
  kunde = [];
  kundeDrop = [];

  uType = '';
  kontant = '';
  ftid = '';
  gruppe = '';

  bId = '';
  sType = '';
  uType = '';

  regnr = [];
  uId = [];
  uBestilling = [this.regnr, this.uId];
  render() {
    return (
      <div className="mainView">
        <div className="mainViewUtleie">
          {/*Dropdown gjøres senere; Kundevalg*/}
            {/*kundenr, utleietype, ftid, ttid, gruppe*/}
          <form>
            <div className="form-group" id="utleie1">
              <label>Kundevalg</label>
                <Dropdown placeholder="Velg Kunde" fluid search selection options={this.kundeDrop} onClick={this.dropDown}/>
                <input type="checkbox" name="Gruppe" value="1" /> Gruppebestilling
                <br />
              <label>Type leie</label>
                <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                  <option>Velg tid</option>
                  <option value="">Timesutleie</option>
                  <option>Dagsutleie</option>
                  <option>3-dagersutleie</option>
                  <option>Ukesleie</option>
                </select>
              <label>Bestilling begynner</label>
                <input className="form-control" type="date" value={this.ftid} onChange={event => (this.ftid = event.target.value)} />
            </div>
            <div className="form-group" id="utleie2">
                <label>Sykkeltype</label>
                  <select className="form-control" onChange={event => (this.sType = event.target.value)}>
                    <option>Velg sykkel</option>
                    <option value="1">Terrengsykkel</option>
                    <option value="2">Landeveisykkel</option>
                    <option value="3">Tandemsykkel</option>
                  </select>
                  <Button.Light>Legg til sykkel</Button.Light>
                <label>Utstyr</label>
                  <select className="form-control" onChange={event => (this.uType = event.target.value)}>
                    <option>Ingen</option>
                    <option value="1">Hjelm</option>
                    <option value="2">Lappesett</option>
                    <option>Bagasjebrett</option>
                    <option>Sykkelveske</option>
                  </select>
                  <Button.Light>Legg til utstyr</Button.Light>
            </div>
            <div className="form-group" id="utleie3">
              <h1>Bestillingen</h1>
            </div>
            <Row>
              <Column>
                <Button.Danger onClick={this.prevPage}>Avbryt</Button.Danger>
              </Column>
              <Column>
                <Button.Success onClick={this.nextPage}>Neste side</Button.Success>
              </Column>
            </Row>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.dropDown();
  }
  dropDown() {
    utleieService.getDropdown(kundenr => {
      this.kunde = JSON.parse(kundenr);
    });

    this.kundeDrop = [];
    this.kunde.map(kunde => {
      this.kundeDrop.push({key: parseInt(kunde.kundenr), text: kunde.fnavn + ' ' + kunde.enavn});
    });
    this.t++;
      // for (this.t = 0; this.t <= this.kunde.length; this.t++){
      //     this.kundeDrop.push({key: parseInt(this.kunde[this.t].kundenr), text: this.kunde[this.t].fnavn + ' ' + this.kunde[this.t].enavn});
      //   };
    console.log(this.kundeDrop);
  }
  nextPage() {
    document.getElementById('utleie' + this.number).style.display = "none";
    this.number++;
    document.getElementById('utleie' + this.number).style.display = "block";
  }
  prevPage() {
    document.getElementById('utleie' + this.number).style.display = "none";
    this.number--;
    document.getElementById('utleie' + this.number).style.display = "block";
  }
  order() {
    utleieService.addBestilling(this.kunde, this.uType, this.kontant, this.ftid, this.gruppe, () => {
      console.log(this.kunde, this.kontant, this.ftid, this.group);
    })
    utleieService.getBestilling(bestilling => {
      this.bId = bestilling;
    })
    utleieService.addUBestilling(this.regnr, this.uId, this.detaljer, this.bId, () => {
      console.log(this.regnr, this.uId, this.detaljer, this.bId);
    })
  }
}

class Endring extends Component {
  render() {
    return <div className="mainView">Her kan vi endre informasjonen på registreringer</div>;
  }
}

class Registrering extends Component {
  render() {
    return <div className="mainView">Her kan vi registrere hva faen vi vil</div>;
  }
}

class UtleieVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/utleie/kundereg">
          <ion-icon name="person-add" />
          Registrer kunde
        </NavCol.Link>
      </NavCol>
    );
  }
}

class RegVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/registrering/ansatt">
          <ion-icon name="contacts" />
          Registrere Ansatt
        </NavCol.Link>

        <NavCol.Link to="/registrering/kunde">
          <ion-icon name="person-add" />
          Registrere kunde
        </NavCol.Link>

        <NavCol.Link to="/registrering/sykkel">
          <ion-icon name="bicycle" />
          Registrere sykler
        </NavCol.Link>

        <NavCol.Link to="/registrering/utstyr">
          <ion-icon name="cube" />
          Registrere utstyr
        </NavCol.Link>
      </NavCol>
    );
  }
}

class EndringVertMenu extends Component {
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
          Endre sykler
        </NavCol.Link>

        <NavCol.Link to="/endring/utstyr">
          <ion-icon name="cube" />
          Endre utstyr
        </NavCol.Link>
      </NavCol>
    );
  }
}

/*Alle oversiktklassene (UtstyrOversikt, SykkelOversikt, KundeOversikt, BestillingOversikt) er skrevet på denne måten*/
/*Table widget med bootstrap klasser allerede valgt. Standard tabell med stripet visning*/
/*Lager en ny rad, har ingen spesielle klasser (enda). Kan altså erstattes med vanlige <tr>*/

class KundeEndring extends Component {
  render() {
    return <div className="mainView">d</div>;
  }
}

class BestillingsEndring extends Component {
  render() {
    return <div className="mainView">c</div>;
  }
}

class SykkelEndring extends Component {
  render() {
    return <div className="mainView">b</div>;
  }
}

class UtstyrEndring extends Component {
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
              <td>
                <input
                  type="text"
                  className="form-control-plaintext"
                  value={utstyr.ustatus}
                  onChange={event => (utstyr.ustatus = event.target.value)}
                />
              </td>
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

class KundeReg extends Component {
  kundenr = '';
  fdag = '';
  fnavn = '';
  enavn = '';
  epost = '';
  tlf = '';

  render() {
    return (
      <div className="mainView">
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Fornavn"
                value={this.fnavn}
                onChange={event => (this.fnavn = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Etternavn"
                value={this.enavn}
                onChange={event => (this.enavn = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                maxLength="12"
                placeholder="12345678"
                value={this.tlf}
                onChange={event => (this.tlf = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Epost"
                value={this.epost}
                onChange={event => (this.epost = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="date"
                placeholder="Fødselsdato"
                value={this.fdag}
                onChange={event => (this.fdag = event.target.value)}
              />
              <br />

              <div className="tilbakeMeny2">
                <button type="button" className="btn btn-success" onClick={this.add}>
                  Registrer kunde
                </button>
              </div>
              <div className="tilbakeMeny">
                <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                  Avbryt registrering
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  add() {
    kundeService.addKunde(this.fnavn, this.enavn, this.tlf, this.epost, this.fdag, this.props.match.params.id, () => {
      history.goBack();
    });
  }

  cancel() {
    history.goBack();
  }
}

class SykkelReg extends Component {
  regnr = '';
  sykkeltypeid = '';
  befinnelse = '';
  status = '';
  beskrivelse = '';
  bestilling = '';
  utleienavn = '';

  render() {
    return (
      <div className="mainView">
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <select
                className="form-control"
                value={this.sykkeltypeid}
                onChange={event => (this.sykkeltypeid = event.target.value)}
              >
                <option value="0">Sykkeltype</option>
                <option value="1">Terrengsykkel</option>
                <option value="2">Landeveissykkel</option>
                <option value="3">Tandemsykkel</option>
              </select>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Befinnelse"
                value={this.befinnelse}
                onChange={event => (this.befinnelse = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Status"
                value={this.status}
                onChange={event => (this.status = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Beskrivelse"
                value={this.beskrivelse}
                onChange={event => (this.beskrivelse = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Tilhører utleiested"
                value={this.utleienavn}
                onChange={event => (this.utleienavn = event.target.value)}
              />
            </div>
            <div className="tilbakeMeny2">
              <button type="button" className="btn btn-success" onClick={this.add}>
                Registrer sykkel
              </button>
            </div>
            <div className="tilbakeMeny">
              <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                Avbryt registrering
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  add() {
    sykkelService.addSykkel(
      this.sykkeltypeid,
      this.befinnelse,
      this.status,
      this.beskrivelse,
      this.utleienavn,
      this.props.match.params.id,
      () => {
        history.goBack();
      }
    );
  }
  cancel() {
    history.goBack();
  }
}

class UtstyrReg extends Component {
  utstyrstypeid = '';
  ustatus = '';

  render() {
    return (
      <div className="mainView">
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <select
                className="form-control"
                form="formen"
                onChange={event => (this.utstyrstypeid = event.target.value)}
              >
                <option>Velg type her</option>
                <option value="1">Hjelm</option>
                <option value="2">Lappesett</option>
              </select>
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Status"
                value={this.ustatus}
                onChange={event => (this.ustatus = event.target.value)}
              />
            </div>
            <br />

            <div className="tilbakeMeny2">
              <button type="button" className="btn btn-success" onClick={this.add}>
                Registrer utstyr
              </button>
            </div>
            <div className="tilbakeMeny">
              <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                Avbryt registrering
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  add() {
    utstyrService.addUtstyr(this.utstyrstypeid, this.ustatus, this.props.match.params.id, () => {
      history.goBack();
    });
  }

  cancel() {
    history.goBack();
  }
}

class AnsattReg extends Component {
  tlfnr = '';
  epost = '';
  fnavn = '';
  enavn = '';
  admin = '';
  utleienavn = '';

  render() {
    return (
      <div className="mainView">
        <div className="KundeReg">
          <form>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Tlf. nr."
                value={this.tlfnr}
                onChange={event => (this.tlfnr = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Epost"
                value={this.epost}
                onChange={event => (this.epost = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Fornavn"
                value={this.fnavn}
                onChange={event => (this.fnavn = event.target.value)}
              />
              <br />
              <input
                className="form-control"
                type="text"
                placeholder="Etternavn"
                value={this.enavn}
                onChange={event => (this.enavn = event.target.value)}
              />
              <br />
              <select className="form-control" form="formen" onChange={event => (this.admin = event.target.value)}>
                <option>Er hen admin?</option>
                <option value="0">Nei</option>
                <option value="1">Ja</option>
              </select>
              <br />

              <input
                className="form-control"
                type="text"
                placeholder="Utleienavn"
                value={this.utleienavn}
                onChange={event => (this.utleienavn = event.target.value)}
              />
              <br />
              <div className="tilbakeMeny2">
                <button type="button" className="btn btn-success" onClick={this.add}>
                  Registrer utstyr
                </button>
              </div>
              <div className="tilbakeMeny">
                <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                  Avbryt registrering
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  add() {
    ansattService.addAnsatt(
      this.tlfnr,
      this.epost,
      this.fnavn,
      this.enavn,
      this.admin,
      this.utleienavn,
      this.props.match.params.id,
      () => {
        history.goBack();
      }
    );
  }

  cancel() {
    history.goBack();
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/oversikt" component={Oversikt} />
      <Route path="/oversikt" component={OversiktVertMenu} />
      <Route path="/oversikt/utstyr" component={UtstyrOversikt} />
      <Route path="/oversikt/sykkel" component={SykkelOversikt} />
      <Route path="/oversikt/kunde" component={KundeOversikt} />
      <Route path="/oversikt/bestilling" component={BestillingOversikt} />
      <Route path="/oversikt/ansatt" component={AnsattOversikt} />

      <Route path="/endring/kunde" component={KundeEndring} />
      <Route path="/endring/sykkel" component={SykkelEndring} />
      <Route path="/endring/utstyr" component={UtstyrEndring} />
      <Route path="/endring/bestillinger" component={BestillingsEndring} />

      <Route exact path="/utleie" component={Utleie} />
      <Route path="/utleie" component={UtleieVertMenu} />
      <Route path="/utleie/kundereg" component={KundeReg} />

      <Route exact path="/endring" component={Endring} />
      <Route path="/endring" component={EndringVertMenu} />

      <Route exact path="/registrering" component={Registrering} />
      <Route path="/registrering" component={RegVertMenu} />
      <Route path="/registrering/kunde" component={KundeReg} />
      <Route path="/registrering/utstyr" component={UtstyrReg} />
      <Route exact path="/kunder" component={KundeOversikt} />
      <Route path="/registrering/sykkel" component={SykkelReg} />
      <Route path="/registrering/ansatt" component={AnsattReg} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
