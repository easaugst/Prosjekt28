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

  updateUtstyr(utstyrsid, utstyrstypeid, ustatus, success) {
    connection.query(
      'update Utstyr set utstyrstypeid=?, ustatus=? where utstyrsid=?',
      [utstyrsid, utstyrstypeid, ustatus],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    )
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
  newDate(success) {
    connection.query(
      'UPDATE Kunde set fdag = DATE_ADD(fdag,INTERVAL 1 DAY) ORDER BY kundenr DESC LIMIT 1',
      [],
      (error,results) => {
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

//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
export let sykkelService = new SykkelService();
export let kundeService = new KundeService();
export let bestillingsService = new BestillingsService();
export let ansattService = new AnsattService();
