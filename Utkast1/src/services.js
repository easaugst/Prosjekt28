import { connection } from './mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utstyrstype UT WHERE U.utstyrstypeid = UT.utstyrstypeid',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  addUtstyr(utstyrsid, utstyrstypeid, ustatus, success) {
    connection.query(
      'insert into Utstyr (utstyrstypeid, ustatus) values (?, ?)',
      [utstyrsid, utstyrstypeid, ustatus],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class SykkelService {
  getSykkel(sykkelid, success) {
    connection.query(
      'SELECT * FROM Sykkel S, Sykkeltype ST WHERE S.sykkeltypeid = ST.sykkeltypeid',
      [sykkelid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  addSykkel(sykkeltypeid, befinnelse, status, beskrivelse, utleienavn, success) {
    connection.query(
      'insert into Sykkel (sykkeltypeid, befinnelse, status, beskrivelse, utleienavn) values (?, ?, ?, ?, ?)',
      [sykkeltypeid, befinnelse, status, beskrivelse, utleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class KundeService {
  getKunde(kundenr, success) {
    connection.query('SELECT * FROM Kunde', [kundenr], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  updateKunde(kundenr, fnavn, enavn, epost, tlf, success) {
    connection.query(
      'update Kunde set fnavn=?, enavn =?, epost=?, tlf =? where kundenr=?',
      [fnavn, enavn, epost, tlf, kundenr],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addKunde(kundenr, fnavn, enavn, epost, tlf, fdag, success) {
    connection.query(
      'insert into Kunde (fnavn, enavn, tlf, epost, fdag) values (?, ?, ?, ?, ?)',
      [kundenr, fnavn, enavn, epost, tlf, fdag],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class AnsattService {
  getAnsatt(ansattnr, success) {
    connection.query('SELECT * FROM FastAnsatt', [ansattnr], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  addAnsatt(ansattnr, tlfnr, epost, fnavn,  enavn, admin, utleienavn, success) {
    connection.query(
      'insert into FastAnsatt (tlfnr, epost, fnavn, enavn, admin, utleienavn) values (?, ?, ?, ?, ?,?)',
      [ansattnr, tlfnr, epost, fnavn,  enavn, admin, utleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

}

class UtleieService {

  getDropdown(success) {
    connection.query('SELECT * FROM Kunde ORDER BY kundenr ASC', (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  getDropdownF(success) {
    connection.query('SELECT fnavn FROM Kunde ORDER BY kundenr ASC', (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  getDropdownE(success) {
    connection.query('SELECT enavn FROM Kunde ORDER BY kundenr ASC', (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  addBestilling(bestillingsid, kundenr, utleietype, kontant, btid, ftid, ttid, gruppe, success) {
    connection.query(
      'insert into Bestilling (kundenr, utleietype, kontant, ftid, ttid, gruppe) values (?, ?, ?, ?, ?,?)',
      [kundenr, utleietype, kontant, ftid,  ttid, gruppe],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addUBestilling(ubid, regnr, utstyrsid, detaljer, bestillingsid, success) {
    connection.query(
      'insert into Ubestilling (regnr, utstyrsid, detaljer, bestillingsid) values (?, ?, ?, ?)',
      [regnr, utstyrsid, detaljer, bestillingsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  getBestilling(bestillingsid, success) {

  connection.query(
    'SELECT MAX(bestillingsid) FROM Bestilling',
    [bestillingsid],
    (error, results) => {
      if (error) return console.error(error);

      success(results);
      }
    );
  }
}

//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
export let sykkelService = new SykkelService();
export let kundeService = new KundeService();
export let bestillingsService = new BestillingsService();
export let ansattService = new AnsattService();
export let utleieService = new UtleieService();
