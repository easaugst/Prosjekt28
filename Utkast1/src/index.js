import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route, Switch } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { sykkelService } from './Services/Sykkel';
import { kundeService } from './Services/Kunde';
import { utstyrService } from './Services/Utstyr';
import { ansattService } from './Services/Ansatt';
import { bestillingsService } from './Services/Bestilling';
import { utleieService } from './Services/Utleie';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { Oversikt, OversiktVertMenu } from './Components/Oversikt/Oversikt';
import { AnsattOversikt } from './Components/Oversikt/Ansatt';
import { KundeOversikt } from './Components/Oversikt/Kunde';
import { BestillingOversikt, BestillingOversiktMeny } from './Components/Oversikt/Bestilling';
import { SykkelOversikt } from './Components/Oversikt/Sykkel';
import { UtstyrOversikt } from './Components/Oversikt/Utstyr';
import { LokasjonOversikt } from './Components/Oversikt/Lokasjon';

import { Registrering, RegVertMenu } from './Components/Registrering/Registrering';
import { AnsattReg } from './Components/Registrering/Ansatt';
import { KundeReg } from './Components/Registrering/Kunde';
import { SykkelReg } from './Components/Registrering/Sykkel';
import { UtstyrReg } from './Components/Registrering/Utstyr';
import { LokasjonReg } from './Components/Registrering/Lokasjon';

import { Endring, EndringVertMenu } from './Components/Endring/Endring';
import { BestillingsEndring, BestillingsEndringMeny, UbestillingsEndringMeny, UbestillingsEndring, Levering } from './Components/Endring/Bestilling';
import { AnsattEndring, AnsattEndringMeny } from './Components/Endring/Ansatt';
import { KundeEndring, KundeEndringMeny } from './Components/Endring/Kunde';
import { SykkelEndring, SykkelEndringMeny } from './Components/Endring/Sykkel';
import { UtstyrEndring, UtstyrEndringMeny } from './Components/Endring/Utstyr';

import { UtleieVertMenu, Utleie } from './Components/Utleie';
import { Login } from './Components/Login.js';
import { Levering2 } from './Components/Levering.js';
import { Statistikk } from './Components/Statistikk';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from './widgets';
const history = createHashHistory();

class Menu extends Component {
  tbm = 'Du må ha administratortilgang for å slette data';
  render() {
    window.tbm = this.tbm;
    return (
      <div className="NavBar">
        <NavBar brand="Sykkelutleie 9000">
          {/*Container for den  horisontale navigjasjonsmenyen, inneholder applikasjonsnavn som presenteres som "Home"*/}
          <NavBar.Link to="/oversikt">Oversikt</NavBar.Link> {/*Navbar.Link er hvert alternativ i menyen*/}
          <NavBar.Link to="/utleie/utleie">Ny bestilling</NavBar.Link>
          <NavBar.Link to="/endring">Endring</NavBar.Link>
          <NavBar.Link to="/registrering">Registrering</NavBar.Link>
          <NavBar.Link to="/statistikk">Statistikk</NavBar.Link>
          <div className="dropdown loggUt">
            <DropdownButton
              className="dropdown-item-button btn-light"
              alignRight
              title={window.ansattnavn + ' (Ansatt Nr.: ' + window.ansatt + ') er innlogget '}
              variant="light"
            >
              <Dropdown.Item
                className="btn-light"
                onClick={() => {
                  history.push('/');
                }}
              >
                Logg ut
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </NavBar>
      </div>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />

        <>
          <Menu />
          <Route exact path="/statistikk" component={Statistikk} />
          <Route exact path="/oversikt" component={Oversikt} />
          <Route path="/oversikt" component={OversiktVertMenu} />
          <Route path="/oversikt/utstyr" component={UtstyrOversikt} />
          <Route path="/oversikt/sykkel" component={SykkelOversikt} />
          <Route path="/oversikt/kunde" component={KundeOversikt} />
          <Route exact path="/oversikt/bestilling" component={BestillingOversikt} />
          <Route path="/oversikt/ansatt" component={AnsattOversikt} />
          <Route path="/oversikt/lokasjon" component={LokasjonOversikt} />

          <Route exact path="/oversikt/bestilling/:id" component={BestillingOversiktMeny} />

          <Route exact path="/endring/kunde" component={KundeEndring} />
          <Route exact path="/endring/sykkel" component={SykkelEndring} />
          <Route exact path="/endring/utstyr" component={UtstyrEndring} />
          <Route path="/endring/bestillinger" component={BestillingsEndring} />
          <Route exact path="/endring/ansatt" component={AnsattEndring} />

          <Route exact path="/endring/bestilling/:bestillingsid" component={BestillingsEndringMeny} />
          <Route exact path="/endring/bestilling/2/:bestillingsid" component={UbestillingsEndringMeny} />
          <Route exact path="/endring/bestilling/3/:bestillingsid" component={UbestillingsEndring} />
          <Route exact path="/endring/utstyr/:utstyrsid" component={UtstyrEndringMeny} />
          <Route exact path="/endring/sykkel/:regnr" component={SykkelEndringMeny} />
          <Route exact path="/endring/kunde/:kundenr" component={KundeEndringMeny} />
          <Route exact path="/endring/ansatt/:ansattnr" component={AnsattEndringMeny} />
          <Route exact path="/endring/levering/:bestillingsid" component={Levering} />

          <Route exact path="/utleie/utleie" component={Utleie} />
          <Route path="/utleie" component={UtleieVertMenu} />
          <Route exact path="/utleie/kundereg" component={KundeReg} />
          <Route exact path="/utleie/levering" component={Levering2} />

          <Route exact path="/endring" component={Endring} />
          <Route path="/endring" component={EndringVertMenu} />

          <Route exact path="/registrering" component={Registrering} />
          <Route path="/registrering" component={RegVertMenu} />
          <Route path="/registrering/kunde" component={KundeReg} />
          <Route path="/registrering/utstyr" component={UtstyrReg} />
          <Route exact path="/kunder" component={KundeOversikt} />
          <Route path="/registrering/sykkel" component={SykkelReg} />
          <Route path="/registrering/ansatt" component={AnsattReg} />
          <Route path="/registrering/lokasjon" component={LokasjonReg} />
        </>
      </Switch>
    </div>
  </HashRouter>,
  document.getElementById('root')
);
