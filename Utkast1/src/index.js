import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { utstyrService } from './services';
import { sykkelService } from './services';
import { kundeService } from './services';
import { bestillingsService } from './services';
const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <div className="hovedMeny">
        <NavLink to="/oversikt" className="meny2">
          Oversikt
        </NavLink>
        &nbsp;&nbsp;
        <NavLink to="/utleie" className="meny2">
          Utleie
        </NavLink>
        &nbsp;&nbsp;
        <NavLink to="/endring" className="meny2">
          Endring
        </NavLink>
        &nbsp;&nbsp;
        <NavLink to="/registrering" className="meny2">
          Registrering
        </NavLink>
      </div>
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
            Gå tilbake
          </NavLink>
          <NavLink to="/utleie" className="tilbakeMeny2">
            Neste
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
      <div className="sideMeny">
        <li className="sideKnapp">
          <NavLink to="/oversikt/bestilling" className="meny">
            Bestillinger
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink to="/oversikt/kunde" className="meny">
            Kunder
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink to="/oversikt/sykkel" className="meny">
            Sykler
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink to="/oversikt/utstyr" className="meny">
            Utstyr
          </NavLink>
        </li>
      </div>
    );
  }
}

class UtleieVertMenu extends Component {
  render() {
    return (
      <div className="sideMeny">
        <li className="sideKnapp">
          <NavLink to="/utleie/KundeReg" className="meny">
            Ny kunde
          </NavLink>
        </li>
      </div>
    );
  }
}

class RegVertMenu extends Component {
  render() {
    return (
      <div className="sideMeny">
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/bestilling">
            Registrere ansatt
          </NavLink>{' '}
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/kunde">
            Registrere kunde
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/sykkel">
            Registrere sykler
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/utstyr">
            Registrere utstyr
          </NavLink>
        </li>
      </div>
    );
  }
}

class EndringVertMenu extends Component {
  render() {
    return (
      <div className="sideMeny">
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/kunde">
            Endre kundeinformasjon
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/bestillinger">
            Endre bestilling
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/sykkel">
            Endre sykler
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/utstyr">
            Endre utstyr
          </NavLink>
        </li>
      </div>
    );
  }
}

class UtstyrOversikt extends Component {
  uArray = [];

  render() {
    return (
      <div className="mainView">
        <table border="1">
          <tbody>
            <tr>
              <th>Utstyrsnr</th>
              <th>Utstyrstype</th>
            </tr>
            {this.uArray.map(utstyr => (
              <tr key={utstyr.utstyrsid}>
                <td>{utstyr.utstyrsid}</td>
                <td>{utstyr.navn}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <table border="1">
          <tbody>
            <tr>
              <th>Reg nr.</th>
              <th>Sykkeltype</th>
              <th>Befinnelse</th>
              <th>Status</th>
              <th>Beskrivelse</th>
              <th>Nåværende bestilling</th>
              <th>Tilhører utleiested</th>
            </tr>
            {this.sArray.map(sykkel => (
              <tr key={sykkel.regnr}>
                <td>{sykkel.regnr}</td>
                <td>{sykkel.sykkeltypenavn}</td>
                <td>{sykkel.befinnelse}</td>
                <td>{sykkel.status}</td>
                <td>{sykkel.beskrivelse}</td>
                <td>{sykkel.bestillingsid}</td>
                <td>{sykkel.utleienavn}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <table border="1">
          <tbody>
            <tr>
              <th>Kundenummer</th>
              <th>Fornavn</th>
              <th>Etternavn</th>
              <th>E-post</th>
              <th>Telefonnummer</th>
            </tr>
            {this.kArray.map(kunde => (
              <tr key={kunde.kundenr}>
                <td>{kunde.kundenr}</td>
                <td>{kunde.fnavn}</td>
                <td>{kunde.enavn}</td>
                <td>{kunde.epost}</td>
                <td>{kunde.tlf}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <table border="1">
          <tbody>
            <tr>
              <th>Bestillingsnummer</th>
              <th>Kundenummer</th>
              <th>Utleietype</th>
              <th>Kontant</th>
              <th>Tidspunkt bestilling</th>
              <th>Fra</th>
              <th>Til</th>
              <th>Gruppe</th>
            </tr>
            {this.bArray.map(bestilling => (
              <tr key={bestilling.bestillingsid}>
                <td>{bestilling.kundeid}</td>
                <td>{bestilling.utleietype}</td>
                <td>{bestilling.kontant}</td>
                <td>{bestilling.btid}</td>
                <td>{bestilling.ftid}</td>
                <td>{bestilling.ttid}</td>
                <td>{bestilling.gruppe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  mounted() {
    bestillingsService.getBestilling(this.props.match.params.bestillingsid, bestilling => {
      this.bArray = bestilling;
    });
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

function goBack() {
  window.history.back();
}
