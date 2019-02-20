import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <div class="hovedMeny">
        <NavLink to="/oversikt">Oversikt</NavLink>
        &nbsp;&nbsp;
        <NavLink to="/utleie">Utleie</NavLink>
        &nbsp;&nbsp;
        <NavLink to="/endring">Endring2</NavLink>
        &nbsp;&nbsp;
        <NavLink to="/registrering">Registrering</NavLink>
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
        <NavLink to="/utleie/kundereg"><button>Ny kunde</button></NavLink>
      </div>
  );  //Button inni NavLink: Tommel opp
  }
}

class returnUtleie extends Component {
  render() {
    return (
      <div className="mainView">
        <NavLink to="/utleie"><button>Gå tilbake</button></NavLink>
      </div>
    )
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
    <div class="sideMeny">
    <NavLink className="meny" to="/oversikt/bestilling">Bestillinger</NavLink>
    <br />
    <NavLink className="meny" to="/oversikt/kunde">Kunder</NavLink>
    <br />
    <NavLink className="meny" to="/oversikt/sykkel">Sykler</NavLink>
    <br />
    <NavLink className="meny" to="/oversikt/utstyr">Utstyr</NavLink>
    </div>
  );
  }
}

class RegVertMenu extends Component {
  render() {
    return (
    <div class="sideMeny">
    <NavLink className="meny" to="/registrering/bestilling">Bestillinger</NavLink>
    <br />
    <NavLink className="meny" to="/registrering/kunde">Kunder</NavLink>
    <br />
    <NavLink className="meny" to="/registrering/sykkel">Sykler</NavLink>
    <br />
    <NavLink className="meny" to="/registrering/utstyr">Utstyr</NavLink>
    </div>
  );
  }
}

class EndringVertMenu extends Component {
  render() {
    return (
    <div class="sideMeny">
    <NavLink className="meny" to="/endring/kunde">Kundeinformasjon</NavLink>
    <br />
    <NavLink className="meny" to="/endring/bestillinger">Kunder</NavLink>
    <br />
    <NavLink className="meny" to="/endring/sykkel">Sykler</NavLink>
    <br />
    <NavLink className="meny" to="/endring/utstyr">Utstyr</NavLink>
    </div>
  );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/oversikt" component={Oversikt} />
      <Route path="/oversikt" component={OversiktVertMenu} />

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
