import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import { ansattService } from './Services/Ansatt';
import { bestillingsService } from './Services/Bestilling';
import { kundeService } from './Services/Kunde';
import { sykkelService } from './Services/Sykkel';
import { utleieService } from './Services/Utleie';
import { utstyrService } from './Services/Utstyr';
import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from './widgets';

import {Oversikt, OversiktVertMenu} from './Components/Oversikt/Oversikt';
import {AnsattOversikt} from './Components/Oversikt/Ansatt';
import {BestillingOversikt, BestillingOversiktMeny} from './Components/Oversikt/Bestilling';
import {KundeOversikt} from './Components/Oversikt/Kunde';
import {SykkelOversikt} from './Components/Oversikt/Ansatt';
import {UtstyrOversikt} from './Components/Oversikt/Utstyr';

import {Registrering, RegVertMenu} from './Components/Registrering/Registrering';
import {AnsattReg} from './Components/Registrering/Ansatt';
import {KundeReg} from './Components/Registrering/Kunde';
import {SykkelReg} from './Components/Registrering/Sykkel';
import {UtstyrReg} from './Components/Registrering/Utstyr';

import {Endring, EndringVertMenu} from './Components/Endring/Endring';
import {BestillingsEndring} from './Components/Endring/Bestilling';
import {KundeEndring, KundeEndringMeny} from './Components/Endring/Kunde';
import {SykkelEndring, SykkelEndringMeny} from './Components/Endring/Sykkel';
import {UtstyrEndring, UtstyrEndringMeny} from './Components/Endring/Utstyr';

import {Utleie, UtleieVertMenu} from './Components/Utleie';

const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <div className="NavBar">
        <NavBar brand="Sykkelutleie 9000">
          {' '}
          {/*Container for den  horisontale navigjasjonsmenyen, inneholder applikasjonsnavn som presenteres som "Home"*/}
          <NavBar.Link to="/oversikt">Oversikt</NavBar.Link> {/*Navbar.Link er hvert alternativ i menyen*/}
          <NavBar.Link to="/utleie">Utleie</NavBar.Link>
          <NavBar.Link to="/endring">Endring</NavBar.Link>
          <NavBar.Link to="/registrering">Registrering</NavBar.Link>
        </NavBar>
      </div>
    );
  }
}

/*Alle oversiktklassene (UtstyrOversikt, SykkelOversikt, KundeOversikt, BestillingOversikt) er skrevet på denne måten*/
/*Table widget med bootstrap klasser allerede valgt. Standard tabell med stripet visning*/
/*Lager en ny rad, har ingen spesielle klasser (enda). Kan altså erstattes med vanlige <tr>*/

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

      <Route exact path="/oversikt/bestilling/:id" component={BestillingOversiktMeny} />

      <Route exact path="/endring/kunde" component={KundeEndring} />
      <Route exact path="/endring/sykkel" component={SykkelEndring} />
      <Route exact path="/endring/utstyr" component={UtstyrEndring} />
      <Route path="/endring/bestillinger" component={BestillingsEndring} />

      <Route exact path="/endring/utstyr/:id" component={UtstyrEndringMeny} />
      <Route exact path="/endring/sykkel/:id" component={SykkelEndringMeny} />
      <Route exact path="/endring/kunde/:id" component={KundeEndringMeny} />

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
