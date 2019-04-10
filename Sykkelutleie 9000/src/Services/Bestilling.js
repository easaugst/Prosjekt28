import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K WHERE B.kundenr = K.kundenr',
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getDelbestilling(bestillingsid, success) {
    connection.query('SELECT Distinct B.bestillingsid, U.regnr, U.ubid, U.utstyrsid, UT.utnavn FROM Ubestilling U, Bestilling B, Sykkel S, Utstyr UY, Utleietype UT WHERE U.bestillingsid = B.bestillingsid and U.bestillingsid = ? AND S.regnr = U.regnr AND S.sykkeltypeid = UT.utid OR (U.bestillingsid = B.bestillingsid and U.bestillingsid = ? AND UY.utstyrsid = U.utstyrsid AND UY.utstyrstypeid = UT.utid) ORDER BY U.ubid',
    [bestillingsid, bestillingsid],
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
  getBestillingFilt(navn, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K WHERE B.kundenr = K.kundenr AND K.fnavn LIKE ? OR (B.kundenr = K.kundenr AND K.enavn LIKE ?)', [navn, navn], (error, results) => {
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
  getAlleSykler(bestillingsid, success) {   //Henter regnr fra alle sykler koblet opp mot spesifisert bestilling
    connection.query('SELECT S.regnr FROM Ubestilling U INNER JOIN Sykkel S WHERE U.bestillingsid = ? AND U.regnr = S.regnr', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  getAltUtstyr(bestillingsid, success) {    //Henter utstyrsid fra alt utstyr koblet opp mot spesifisert bestilling
    connection.query('SELECT U.utstyrsid FROM Ubestilling UB INNER JOIN Utstyr U WHERE UB.bestillingsid = ? AND U.utstyrsid = UB.Utstyrsid', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    })
  }
  updateSykkel(sykkel, success) {   //Oppdaterer status på spesifisert sykel
    connection.query('UPDATE Sykkel SET status = "Lager" WHERE regnr = ?', [sykkel], (error, results) => {
      if (error) return console.error(error);

      success();
    })
  }
  updateUtstyr(utstyr, success) {   //Oppdaterer status på spesifisert utstyr
    connection.query('UPDATE Utstyr SET ustatus = "Lager" WHERE utstyrsid = ?', [utstyr], (error, results) => {
      if (error) return console.error(error);

      success();
    })
  }
  slettAlleUbestilling(bestillingsid, success){   //Sletter alle delbestillinger koblet opp mot spesifisert bestilling
  connection.query('DELETE FROM Ubestilling WHERE bestillingsid = ?', [bestillingsid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
  }
  levering(bestillingsid, success) {    //Opdaterer bestilling til inaktiv og endrer status på utstyr og sykler til "Lager"
    connection.query('UPDATE Sykkel S, Ubestilling U, Bestilling B, Utstyr UT SET S.status = "Lager" WHERE S.regnr = U.regnr AND U.bestillingsid = B.bestillingsid AND B.bestillingsid = ?', [bestillingsid],
    (error, results) => {
      if (error) return console.error(error);

      success();
    });
    connection.query('UPDATE Ubestilling U, Bestilling B, Utstyr UT SET UT.ustatus = "Lager" WHERE UT.utstyrsid = U.utstyrsid AND U.bestillingsid = B.bestillingsid AND B.bestillingsid = ?', [bestillingsid],
    (error, results) => {
      if (error) return console.error(error);

      success();
    });
    connection.query('UPDATE Bestilling SET status = "Inaktiv" WHERE bestillingsid = ?', [bestillingsid],
    (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

export let bestillingsService = new BestillingsService();
