import React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import { sykkelService } from '../../Services/Sykkel';
import { kundeService } from '../../Services/Kunde';
import { utstyrService } from '../../Services/Utstyr';
import { ansattService } from '../../Services/Ansatt';
import { bestillingsService } from '../../Services/Bestilling';
import { utleieService } from '../../Services/Utleie';

import { Card, List, Row, Column, NavBar, Button, Form, NavCol, Table } from '../../widgets';
const history = createHashHistory();

export class UtstyrOversikt extends Component {
  uArray = [];
  uFArray = [];
  number = 0;
  a = "";
  b = 2;
  sideMengde = 25; sider = []; aktivSide = 0; sisteSide = '';
  utstyr = '';

  render() {
    return (
      <div className="mainView">
        <div className="filterView">
          <Form.Label>Filtrer:</Form.Label>
          <select id="drop" className="form-control" form="formen" onChange={this.filter}>
            <option value="0">Alle</option>
            <option value="4">Hjelmer</option>
            <option value="5">Lappesett</option>
            <option value="6">Sykkelveske</option>
            <option value="7">Barnesete</option>
            <option value="8">Barnehenger</option>
            <option value="9">Lastehenger</option>
            <option value="10">Beskytter</option>
            <option value="11">Lås</option>
          </select>
        </div>
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
          </div>
            <Table>
              <Table.Rad>
                <th>Utstyrsnr</th>
                <th>Utstyrstype</th>
                <th>Status</th>
                <th>Befinnelse</th>
                <th>Tilhører utleiested</th>
              </Table.Rad>
              {this.uArray.slice(mengde.forrigeSide, mengde.sideMengde).map(utstyr => (
                <Table.Rad key={utstyr.utstyrsid}>
                  <td>{utstyr.utstyrsid}</td>
                  <td>{utstyr.utnavn}</td>
                  <td>{utstyr.ustatus}</td>
                  <td>{utstyr.ubefinnelse}</td>
                  <td>{utstyr.utsutleienavn}</td>
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
    utstyrService.countUtstyr(utstyr => {
      this.utstyr = parseInt(utstyr.substr(utstyr.lastIndexOf(':') + 1));
      console.log(this.utstyr);
      this.utstyrSortering();
    })
    utstyrService.getUtstyr(utstyr => {
      this.uArray = utstyr;
    });
  }

  filter() {
    this.number = document.getElementById('drop').value;
    if(this.number > 3){
    utstyrService.getUtstyrFilt(this.number, utstyrF => {
      this.uArray = utstyrF;
    });
  }
  else {
    utstyrService.getUtstyr(utstyr => {
      this.uArray = utstyr;
    }
  );
  }
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

  utstyrSortering() {
    if (this.utstyr > this.sideMengde) {
      this.sisteSide = this.utstyr % this.sideMengde;
      this.utstyr -= this.sisteSide;
      console.log(this.utstyr, this.sisteSide);
    }
    for (var i = 1; i <= (this.utstyr / this.sideMengde + 1); i++) {
      if (i == (this.utstyr / this.sideMengde + 1)) {
        this.sider.push({ forrigeSide: (i -1) * this.sideMengde, sideMengde: (i -1) * this.sideMengde + this.sisteSide });
        console.log('Siste side: ' + this.sisteSide);
      } else {
        if (this.sider.length == 0) {
          this.sider.push({ forrigeSide: 0, sideMengde: this.sideMengde });
          console.log('Første side opprettet: ', this.sider[0]);
        } else {
          this.sider.push({ forrigeSide: (i - 1) * this.sideMengde, sideMengde: i * this.sideMengde });
        }
      }
    }
    console.log(this.sider);
    document.getElementById('side' + this.sider[this.aktivSide].sideMengde).style.display = 'block';
  }

  // start() {
  //   while(this.b <=3) {
  //     this.a = ('utstyr' + this.b);
  //     document.getElementById(this.a).style.display = "none";
  //     this.b ++;
  //   }
  // }
  //
  // vis() {
  //   for(var i=1;i<=3;i++) {
  //     if(i == this.number ){
  //         this.a = ('utstyr' + this.number);
  //         document.getElementById(this.a).style.display = "block";
  //     }
  //     else {
  //       this.a = ('utstyr' + i);
  //       document.getElementById(this.a).style.display = "none";
  //     }
  // }
  // }

}
