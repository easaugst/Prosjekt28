import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { utstyrService } from './services';
import { sykkelService } from './services';
import { kundeService } from './services';
import { bestillingsService } from './services';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, TableOvrs } from './widgets';
const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Sykkelutleie 9000">
        <NavBar.Link to="/oversikt">Oversikt</NavBar.Link>
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
    return <div className="mainView">Her får vi en oversikt over utleie</div>;
  }
}

class returnUtleie extends Component {
  render() {
    return (
      <div className="mainView">
        <div className="utleieMainView">
          <NavLink to="/utleie" className="tilbakeMeny">
            Avbryt registrering
          </NavLink>
          <NavLink to="/utleie" className="tilbakeMeny2">
            Registrer kunde
          </NavLink>
        </div>
      </div>
    );
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

class KundeReg extends Component {
  render() {
    return (
      <div className="mainView">
        <div className="KundeReg">
          <form>
            <input type="text" placeholder="Fornavn" />
            &nbsp;
            <input type="text" placeholder="Etternavn" />
            <br /> <br />
            <input type="text" maxLength="12" placeholder="12345678" />
            <br /> <br />
            <input type="text" placeholder="Epost" />
            <br /> <br />
            <input type="date" placeholder="Fødselsdato" />
          </form>
        </div>
      </div>
    );
  }
}

class OversiktVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/oversikt/bestilling">Bestilling</NavCol.Link>
        <NavCol.Link to="/oversikt/kunde">Kunde</NavCol.Link>
        <NavCol.Link to="/oversikt/sykkel">Sykler</NavCol.Link>
        <NavCol.Link to="/oversikt/utstyr">Utstyr</NavCol.Link>
      </NavCol>
    );
  }
}

class UtleieVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/uteie/kundereg">Registrer kunde</NavCol.Link>
      </NavCol>
    );
  }
}

class RegVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/registrering/bestilling">Registrere Ansatt</NavCol.Link>
        <NavCol.Link to="/registrering/kunde">Registrere kunde</NavCol.Link>
        <NavCol.Link to="/registrering/sykkel">Registrere sykler</NavCol.Link>
        <NavCol.Link to="/registrering/utstyr">Registrere utstyr</NavCol.Link>
      </NavCol>
    );
  }
}

class EndringVertMenu extends Component {
  render() {
    return (
      <NavCol>
        <NavCol.Link to="/endring/kunde">Endre kundeinformasjon</NavCol.Link>
        <NavCol.Link to="/endring/bestillinger">Endre bestilling</NavCol.Link>
        <NavCol.Link to="/endring/sykkel">Endre sykler</NavCol.Link>
        <NavCol.Link to="/endring/utstyr">Endre utstyr</NavCol.Link>
      </NavCol>
    );
  }
}

class UtstyrOversikt extends Component {
  uArray = [];

  render() {
    return (
      <div className="mainView">
        <TableOvrs>
          <TableOvrs.Rad>
            <th>Utstyrsnr</th>
            <th>Utstyrstype</th>
          </TableOvrs.Rad>
          {this.uArray.map(utstyr => (
            <TableOvrs.Rad>
              <td>{utstyr.utstyrsid}</td>
              <td>{utstyr.navn}</td>
            </TableOvrs.Rad>
          ))}
        </TableOvrs>
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
        <TableOvrs>
          <TableOvrs.Rad>
            <th>Reg nr.</th>
            <th>Sykkeltype</th>
            <th>Befinnelse</th>
            <th>Status</th>
            <th>Beskrivelse</th>
            <th>Nåværende bestilling</th>
            <th>Tilhører utleiested</th>
          </TableOvrs.Rad>
          {this.sArray.map(sykkel => (
            <TableOvrs.Rad key={sykkel.regnr}>
              <td>{sykkel.regnr}</td>
              <td>{sykkel.sykkeltypenavn}</td>
              <td>{sykkel.befinnelse}</td>
              <td>{sykkel.status}</td>
              <td>{sykkel.beskrivelse}</td>
              <td>{sykkel.bestillingsid}</td>
              <td>{sykkel.utleienavn}</td>
            </TableOvrs.Rad>
          ))}
        </TableOvrs>
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

  render() {
    return (
      <div className="mainView">
        <TableOvrs>
          <TableOvrs.Rad>
            <th>Kundenummer</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>E-post</th>
            <th>Telefonnummer</th>
          </TableOvrs.Rad>
          {this.kArray.map(kunde => (
            <TableOvrs.Rad key={kunde.kundenr}>
              <td>{kunde.kundenr}</td>
              <td>{kunde.fnavn}</td>
              <td>{kunde.enavn}</td>
              <td>{kunde.epost}</td>
              <td>{kunde.tlf}</td>
            </TableOvrs.Rad>
          ))}
        </TableOvrs>
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
        <TableOvrs>
          <TableOvrs.Rad>
            <th>Bestillingsnummer</th>
            <th>Kundenummer</th>
            <th>Utleietype</th>
            <th>Kontant</th>
            <th>Tidspunkt bestilling</th>
            <th>Fra</th>
            <th>Til</th>
            <th>Gruppe</th>
          </TableOvrs.Rad>
          {this.bArray.map(bestilling => (
            <TableOvrs.Rad key={bestilling.bestillingsid}>
              <td>{bestilling.bestillingsid}</td>
              <td>{bestilling.kundeid}</td>
              <td>{bestilling.utleietype}</td>
              <td>{bestilling.kontant}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{bestilling.gruppe}</td>
            </TableOvrs.Rad>
          ))}
        </TableOvrs>
      </div>
    );
  }

  mounted() {
    bestillingsService.getBestilling(this.props.match.params.bestillingsid, bestilling => {
      this.bArray = bestilling;
    });
  }
}

class KundeEndring {

  render() {
    return(
        <div>

        </div>


    );
  }

  mounted(){

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

      <Route exact path="/utleie" component={Utleie} />
      <Route path="/utleie" component={UtleieVertMenu} />
      <Route exact path="/utleie/kundereg" component={KundeReg} />
      <Route exact path="/utleie/kundereg" component={returnUtleie} />

      <Route exact path="/endring" component={Endring} />
      <Route path="/endring" component={EndringVertMenu} />

      <Route exact path="/registrering" component={Registrering} />
      <Route path="/registrering" component={RegVertMenu} />
      <Route path="/registrering/kunde" component={KundeReg} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
