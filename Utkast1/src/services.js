import { connection } from './mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utstyrstype UT WHERE U.utstyrstype = UT.utstyrstypeid',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  addUtstyr(utstyrsid, utstyrstype, ustatus, success) {
    connection.query(
      'insert into Utstyr (utstyrstype, ustatus) values (?, ?)',
      [utstyrsid, utstyrstype, ustatus],
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

//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
export let sykkelService = new SykkelService();
export let kundeService = new KundeService();
export let bestillingsService = new BestillingsService();
