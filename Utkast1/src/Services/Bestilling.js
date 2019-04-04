import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K WHERE B.kundenr = K.kundenr',
    [bestillingsid],
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  countBestilling(success) {
    connection.query('SELECT COUNT(bestillingsid) FROM Bestilling',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  getDelbestilling(bestillingsid, ubid, success) {
    connection.query('SELECT Distinct B.bestillingsid, U.regnr, U.ubid, U.utstyrsid, UT.utnavn FROM Ubestilling U, Bestilling B, Sykkel S, Utstyr UY, Utleietype UT WHERE U.bestillingsid = B.bestillingsid and U.bestillingsid = ? AND S.regnr = U.regnr AND S.sykkeltypeid = UT.utid OR (U.bestillingsid = B.bestillingsid and U.bestillingsid = ? AND UY.utstyrsid = U.utstyrsid AND UY.utstyrstypeid = UT.utid) ORDER BY U.ubid',
    [bestillingsid, bestillingsid, ubid],
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBestillingEndring(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling WHERE bestillingsid = ?', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  getDelbestillingEndring(ubid, success) {
    connection.query('SELECT ubid, regnr, utstyrsid, detaljer, bestillingsid FROM Ubestilling WHERE ubid = ?', [ubid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  updateBestilling(kundenr, utleiested, utleietype, kontant, gruppe, bestillingsid, success) {
    connection.query(
      'UPDATE Bestilling SET kundenr=?, utleiested=?, utleietype=?, kontant=?, gruppe =? WHERE bestillingsid=?',
      [kundenr, utleiested, utleietype, kontant, gruppe, bestillingsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  updateUbestilling(regnr, utstyrsid, detaljer, bestillingsid, ubid, success) {
    connection.query(
      'UPDATE Ubestilling SET regnr=?, utstyrsid=?, detaljer=?, bestillingsid = ? WHERE ubid=?',
      [regnr, utstyrsid, detaljer, bestillingsid, ubid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  slettBestilling(bestillingsid, success){
  connection.query('DELETE FROM Bestilling WHERE bestillingsid = ?', [bestillingsid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
  }
  slettUbestilling(ubid, success){
  connection.query('DELETE FROM Ubestilling WHERE ubid = ?', [ubid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
  }
  getAlleSykler(bestillingsid, success) {
    connection.query('SELECT S.regnr FROM Ubestilling U INNER JOIN Sykkel S WHERE U.bestillingsid = ? AND U.regnr = S.regnr', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  getAltUtstyr(bestillingsid, success) {
    connection.query('SELECT U.utstyrsid FROM Ubestilling UB INNER JOIN Utstyr U WHERE UB.bestillingsid = ? AND U.utstyrsid = UB.Utstyrsid', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  updateSykkel(sykkel, success) {
    connection.query('UPDATE Sykkel SET status = "Lager" WHERE regnr = ?', [sykkel], (error, results) => {
      if (error) return console.error(error);

      success();
    })
  }
  updateUtstyr(utstyr, success) {
    connection.query('UPDATE Utstyr SET ustatus = "Lager" WHERE utstyrsid = ?', [utstyr], (error, results) => {
      if (error) return console.error(error);

      success();
    })
  }
  slettAlleUbestilling(bestillingsid, success){
  connection.query('DELETE FROM Ubestilling WHERE bestillingsid = ?', [bestillingsid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
  }
  getBestillingFilt(fnavn, enavn, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K WHERE B.kundenr = K.kundenr AND K.fnavn LIKE ? OR (B.kundenr = K.kundenr AND K.enavn LIKE ?)', [fnavn, enavn], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let bestillingsService = new BestillingsService();
