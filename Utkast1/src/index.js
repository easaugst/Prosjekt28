import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { UtstyrService } from './services';
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
    return (
      <div className="mainView">
        <NavLink to="/utleie/kundereg">
          <button>Ny kunde</button>
        </NavLink>
      </div>
    ); //Button inni NavLink: Tommel opp
  }
}

class returnUtleie extends Component {
  render() {
    return (
      <div className="mainView">
        <NavLink to="/utleie">
          <button>Gå tilbake</button>
        </NavLink>
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
        <form>
          <input type="text" placeholder="Fornavn" />
          &nbsp;
          <input type="text" placeholder="Etternavn" />
          <br /> <br />
          <input type="text" maxLength="8" placeholder="12345678" />
        </form>
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

class RegVertMenu extends Component {
  render() {
    return (
      <div className="sideMeny">
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/bestilling">
            Bestillinger
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/kunde">
            Kunder
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/sykkel">
            Sykler
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/registrering/utstyr">
            Utstyr
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
            Kundeinformasjon
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/bestillinger">
            Kunder
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/sykkel">
            Sykler
          </NavLink>
        </li>
        <br />
        <li className="sideKnapp">
          <NavLink className="meny" to="/endring/utstyr">
            Utstyr
          </NavLink>
        </li>
      </div>
    );
  }
}

class Utstyr extends Component {
  render() {
    return <div className="mainView">Test</div>;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/oversikt" component={Oversikt} />
      <Route path="/oversikt" component={OversiktVertMenu} />
      <Route path="/oversikt/utstyr" component={Utstyr} />

      <Route exact path="/utleie" component={Utleie} />
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
