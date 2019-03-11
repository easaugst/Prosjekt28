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

class Oversikt extends Component {
  render() {
    return <div className="mainView">Her får vi en oversikt over bestillinger, kunder, sykler og utstyr</div>;
  }
}

class Utleie extends Component {
  render() {
    return (
      <div className="mainView">
        <div className="mainViewUtleie">
          <h3>Legg til bestilling</h3>
          <form>
            <div className="form-group">
              <label>Telefonnummer</label>
              <input className="form-control" type="number" placeholder="Telefonnummer" value="" onChange="" />
              <label>Sykkeltype</label>
              <select className="form-control">
                <option>Terrengsykkel</option>
                <option>Landeveisykkel</option>
                <option>Tandemsykkel</option>
              </select>
              <label>Utstyr</label>
              <select className="form-control">
                <option>Ingen</option>
                <option>Hjelm</option>
                <option>Bagasjebrett</option>
                <option>Sykkelveske</option>
              </select>
              <select className="form-control" placeholder="Antall">
                <option>Ingen</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
              <label>Type leie</label>
              <select className="form-control">
                <option>Timesutleie</option>
                <option>Dagsutleie</option>
                <option>3-dagersutleie</option>
                <option>Ukesleie</option>
              </select>
            </div>
          </form>
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
    return <div className="mainView">Her kan vi registrere hva vi vil</div>;
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
        <NavCol.Link to="/oversikt/ansatt">
          <ion-icon name="contacts" />
          Ansatt
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
              <td>{utstyr.ustatus}</td>{' '}
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
            <th>Fødselsdato</th>
            <th>Tid registrert</th>
          </Table.Rad>
          {this.kArray.map(kunde => (
            <Table.Rad key={kunde.kundenr}>
              <td>{kunde.kundenr}</td>
              <td>{kunde.fnavn}</td>
              <td>{kunde.enavn}</td>
              <td>{kunde.epost}</td>
              <td>{kunde.tlf}</td>
              <td>
                {JSON.stringify(kunde.fdag)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -15)}
              </td>
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
              <td>{bestilling.kundenr}</td>
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
            <th>Fødselsdato</th>
            <th>Tid registrert</th>
            <th> Rediger </th>
          </Table.Rad>
          {this.kArray.map(kunde => (
            <Table.Rad key={kunde.kundenr}>
              <td>{kunde.kundenr}</td>
              <td>{kunde.fnavn}</td>
              <td>{kunde.enavn}</td>
              <td>{kunde.epost}</td>
              <td>{kunde.tlf}</td>
              <td>
                {JSON.stringify(kunde.fdag)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -15)}
              </td>
              <td>
                {JSON.stringify(kunde.rtid)
                  .replace(/T|Z|"/g, ' ')
                  .slice(0, -6)}
              </td>
              <td>
                <NavLink to={'/endring/kunde/' + kunde.kundenr + '/'}>Rediger</NavLink>
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

class KundeEndringMeny extends Component {
  fnavn = null;
  enavn = null;
  epost = null;
  tlf = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre kundeinformasjon">
          <Form.Label>Fornavn:</Form.Label>
          <Form.Input type="text" value={this.fnavn} onChange={event => (this.fnavn = event.target.value)} />

          <Form.Label>Etternavn:</Form.Label>
          <Form.Input type="text" value={this.enavn} onChange={event => (this.enavn = event.target.value)} />

          <Form.Label>Epost:</Form.Label>
          <Form.Input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />

          <Form.Label>Tlf:</Form.Label>
          <Form.Input type="text" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Registrer kunde
            </button>
          </span>
          <span className="tilbakeMeny">
            <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
              Avbryt
            </button>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    kundeService.getKunde(this.props.match.params.kundenr, kunde => {
      this.fnavn = kunde.fnavn;
      this.enavn = kunde.enavn;
      this.epost = kunde.epost;
      this.tlf = kunde.tlf;
    });
  }
  save() {
    kundeService.updateKunde(this.fnavn, this.enavn, this.epost, this.tlf, this.props.match.params.id, () => {
      history.push('/endring/kunde');
    });
  }
  cancel() {
    history.goBack();
  }
}

class BestillingsEndring extends Component {
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
              <td>{bestilling.kundenr}</td>
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

class SykkelEndring extends Component {
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
            <th>Rediger</th>
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
              <td>
                <NavLink to={'/endring/sykkel/' + sykkel.regnr + '/'}>Rediger</NavLink>
              </td>
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

class SykkelEndringMeny extends Component {
  sykkeltypeid = null;
  befinnelse = null;
  status = null;
  beskrivelse = null;
  utleienavn = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre sykkelinformasjon">
          <Form.Label>Sykkeltype:</Form.Label>
          <select
            className="form-control"
            value={this.sykkeltypeid}
            onChange={event => (this.sykkeltypeid = event.target.value)}
          >
            <option>Sykkeltype</option>
            <option value="1">Terrengsykkel</option>
            <option value="2">Landeveissykkel</option>
            <option value="3">Tandemsykkel</option>
          </select>

          <Form.Label>Befinnelse:</Form.Label>
          <Form.Input type="text" value={this.befinnelse} onChange={event => (this.befinnelse = event.target.value)} />

          <Form.Label>Status:</Form.Label>
          <Form.Input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />

          <Form.Label>Beskrivelse:</Form.Label>
          <Form.Input
            type="text"
            value={this.beskrivelse}
            onChange={event => (this.beskrivelse = event.target.value)}
          />

          <Form.Label>Tilhører utleiested:</Form.Label>
          <Form.Input type="text" value={this.utleienavn} onChange={event => (this.utleienavn = event.target.value)} />
        </Card>
        <br />

        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Registrer kunde
            </button>
          </span>
          <span className="tilbakeMeny">
            <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
              Avbryt
            </button>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.getSykkel(this.props.match.params.regnr, sykkel => {
      this.sykkeltypeid = sykkel.sykkeltypeid;
      this.befinnelse = sykkel.befinnelse;
      this.status = sykkel.status;
      this.beskrivelse = sykkel.beskrivelse;
      this.utleienavn = sykkel.utleienavn;
    });
  }
  save() {
    sykkelService.updateSykkel(
      this.sykkeltypeid,
      this.befinnelse,
      this.status,
      this.beskrivelse,
      this.utleienavn,
      this.props.match.params.id,
      () => {
        history.push('/endring/sykkel');
      }
    );
  }
  cancel() {
    history.goBack();
  }
}

class AnsattOversikt extends Component {
  aArray = [];

  render() {
    return (
      <div className="mainView">
        <Table>
          <Table.Rad>
            <th>Ansattnummer</th>
            <th>Tlf.nr</th>
            <th>Epost</th>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Administrator</th>
            <th>Arbeidsplass</th>
          </Table.Rad>
          {this.aArray.map((ansatt /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
            <Table.Rad key={ansatt.ansattnr}>
              <td>{ansatt.ansattnr}</td>
              <td>{ansatt.tlfnr}</td>
              <td>{ansatt.epost}</td>
              <td>{ansatt.fnavn}</td>
              <td>{ansatt.enavn}</td>
              <td>{ansatt.admin}</td>
              <td>{ansatt.utleienavn}</td>
            </Table.Rad>
          ))}
        </Table>
      </div>
    );
  }
  mounted() {
    ansattService.getAnsatt(this.props.match.params.ansattnr, ansatt => {
      this.aArray = ansatt;
    });
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
            <th>Rediger</th>
          </Table.Rad>
          {this.uArray.map((utstyr /*Dette leses som js, ikke html. Kan ikke bruke {} rundt kommentarer her*/) => (
            <Table.Rad key={utstyr.utstyrsid}>
              <td>{utstyr.utstyrsid}</td>
              <td>{utstyr.navn}</td>
              <td>{utstyr.ustatus}</td>
              <td>
                <NavLink to={'/endring/utstyr/' + utstyr.utstyrsid + '/'}>Rediger</NavLink>
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

class UtstyrEndringMeny extends Component {
  utstyrstypeid = null;
  ustatus = null;

  render() {
    //  if (!this.utstyrstypeid && !this.ustatus) return null;
    return (
      <div className="mainView">
        <Card title="Endre utstyrsinformasjon">
          <Form.Label>Utstyrstype:</Form.Label>
          <select className="form-control" form="formen" onChange={event => (this.utstyrstypeid = event.target.value)}>
            <option>Velg type her</option>
            <option value="1">Hjelm</option>
            <option value="2">Lappesett</option>
          </select>
          <Form.Label>Utstyrstatus:</Form.Label>
          <Form.Input type="text" value={this.ustatus} onChange={event => (this.ustatus = event.target.value)} />
        </Card>
        <br />
        <div className="knapper">
          <span className="tilbakeMeny2">
            <button type="button" className="btn btn-success" onClick={this.save}>
              Registrer kunde
            </button>
          </span>
          <span className="tilbakeMeny">
            <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
              Avbryt
            </button>
          </span>
        </div>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyr(this.props.match.params.utstyrsid, utstyr => {
      this.utstyrstypeid = utstyr.utstyrstypeid;
      this.ustatus = utstyr.ustatus;
    });
  }
  save() {
    utstyrService.updateUtstyr(this.utstyrstypeid, this.ustatus, this.props.match.params.id, () => {
      history.push('/endring/utstyr');
    });
  }
  cancel() {
    history.goBack();
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
        <h3>Legg til kunde</h3>
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
                type="email"
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

              <div className="knapper">
                <span className="tilbakeMeny2">
                  <button type="button" className="btn btn-success" onClick={this.add}>
                    Registrer kunde
                  </button>
                </span>
                <span className="tilbakeMeny">
                  <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                    Avbryt registrering
                  </button>
                </span>
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
    kundeService.newDate(() => {});
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
        <h3>Legg til sykkel</h3>
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
            <div className="knapper">
              <span className="tilbakeMeny2">
                <button type="button" className="btn btn-success" onClick={this.add}>
                  Registrer kunde
                </button>
              </span>
              <span className="tilbakeMeny">
                <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                  Avbryt registrering
                </button>
              </span>
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
        <h3>Legg til utstyr</h3>
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

            <div className="knapper">
              <span className="tilbakeMeny2">
                <button type="button" className="btn btn-success" onClick={this.add}>
                  Registrer kunde
                </button>
              </span>
              <span className="tilbakeMeny">
                <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                  Avbryt registrering
                </button>
              </span>
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
        <h3>Legg til ansatt</h3>
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
              <div className="knapper">
                <span className="tilbakeMeny2">
                  <button type="button" className="btn btn-success" onClick={this.add}>
                    Registrer kunde
                  </button>
                </span>
                <span className="tilbakeMeny">
                  <button type="button" className="btn btn-outline-danger" onClick={this.cancel}>
                    Avbryt registrering
                  </button>
                </span>
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
