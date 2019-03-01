import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { utstyrService, sykkelService, kundeService, bestillingsService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from './widgets';
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

class Oversikt extends Component {
  render() {
    return <div className="mainView">Her får vi en oversikt over bestillinger, kunder, sykler og utstyr</div>;
  }
}

class Utleie extends Component {
  render() {
    return <div className="mainView">
            <div className="mainViewUtleie">
              <form>
                <div className="form-group">
                  <label>Telefonnummer</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Telefonnummer"
                    value=""
                    onChange=""
                  />
                  <label>Sykkeltype</label>
                  <select className="form-control">
                    <option>Terrengsykkel</option>
                    <option>Landeveisykkel</option>
                    <option>Tandemsykkel</option>
                  </select>
                </div>
              </form>
            </div>
          </div>;
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

class OversiktVertMenu extends Component {
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
          Sykler
        </NavCol.Link>

        <NavCol.Link to="/oversikt/utstyr">
          <ion-icon name="cube" />
          Utstyr
        </NavCol.Link>
      </NavCol>
    );
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
        <NavCol.Link to="/registrering/bestilling">
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
class UtstyrOversikt extends Component {
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

class SykkelOversikt extends Component {
  sArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Reg nr.</th>
            <th>Sykkeltype</th>
            <th>Befinnelse</th>
            <th>Status</th>
            <th>Beskrivelse</th>
            <th>Nåværende bestilling</th>
            <th>Tilhører utleiested</th>
          </Table.Rad>
          {this.sArray.map(sykkel => (
            <Table.Rad key={sykkel.regnr}>
              <td>{sykkel.regnr}</td>
              <td>{sykkel.sykkeltypenavn}</td>
              <td>{sykkel.befinnelse}</td>
              <td>{sykkel.status}</td>
              <td>{sykkel.beskrivelse}</td>
              <td>{sykkel.bestillingsid}</td>
              <td>{sykkel.utleienavn}</td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    sykkelService.getSykkel(this.props.match.params.regnr, sykkel => {
      this.sArray = sykkel;
    });
  }
}

class KundeOversikt extends Component {
  kArray = [];
  tid = '';

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Kundenummer</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>E-post</th>
            <th>Telefonnummer</th>
            <th>Tid registrert</th>
          </Table.Rad>
          {this.kArray.map(kunde => (
            <Table.Rad key={kunde.kundenr}>
              <td>{kunde.kundenr}</td>
              <td>
                <input type="text" className="form-control-plaintext" value={kunde.fnavn} />
              </td>
              <td>{kunde.enavn}</td>
              <td>{kunde.epost}</td>
              <td>{kunde.tlf}</td>
              <td>
                {JSON.stringify(kunde.rtid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    kundeService.getKunde(this.props.match.params.kundenr, kunde => {
      this.kArray = kunde;
    });
  }
}

class BestillingOversikt extends Component {
  bArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Bestillingsnummer</th>
            <th>Kundenummer</th>
            <th>Utleietype</th>
            <th>Kontant</th>
            <th>Tidspunkt bestilling</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Gruppe</th>
          </Table.Rad>
          {this.bArray.map(bestilling => (
            <Table.Rad key={bestilling.bestillingsid}>
              <td>{bestilling.bestillingsid}</td>
              <td>{bestilling.kundeid}</td>
              <td>{bestilling.utleietype}</td>
              <td>{bestilling.kontant}</td>
              <td>
                {JSON.stringify(bestilling.btid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>
                {JSON.stringify(bestilling.ftid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>
                {JSON.stringify(bestilling.ttid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>{bestilling.gruppe}</td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }

  mounted() {
    bestillingsService.getBestilling(this.props.match.params.bestillingsid, bestilling => {
      this.bArray = bestilling;
    });
  }
}

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
            &nbsp;
            <input
              className="form-control"
              type="text"
              placeholder="Etternavn"
              value={this.enavn}
              onChange={event => (this.enavn = event.target.value)}
            />
            <br /> <br />
            <input
              className="form-control"
              type="text"
              maxLength="12"
              placeholder="12345678"
              value={this.tlf}
              onChange={event => (this.tlf = event.target.value)}
            />
            <br /> <br />
            <input
              className="form-control"
              type="text"
              placeholder="Epost"
              value={this.epost}
              onChange={event => (this.epost = event.target.value)}
            />
            <br /> <br />
            <input
              className="form-control"
              type="date"
              placeholder="Fødselsdato"
              value={this.fdag}
              onChange={event => (this.fdag = event.target.value)}
            />
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
      <Route exact path="/kunder" component={KundeOversikt} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
