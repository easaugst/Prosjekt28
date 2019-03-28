import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K where B.kundenr = K.kundenr', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getDelbestilling(bestillingsid, ubid, success) {
    connection.query('SELECT Distinct B.bestillingsid, U.regnr, U.ubid, U.utstyrsid, UT.utnavn FROM Ubestilling U, Bestilling B, Sykkel S, Utstyr UY, Utleietype UT where U.bestillingsid = B.bestillingsid and U.bestillingsid = ? AND S.regnr = U.regnr AND S.sykkeltypeid = UT.utid OR (U.bestillingsid = B.bestillingsid and U.bestillingsid = ? AND UY.utstyrsid = U.utstyrsid AND UY.utstyrstypeid = UT.utid) ORDER BY U.ubid', [bestillingsid, bestillingsid, ubid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBestillingEndring(bestillingsid, success) {
    connection.query('SELECT gruppe, kontant, kundenr, utleietype FROM Bestilling WHERE bestillingsid = ?', [bestillingsid], (error, results) => {
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
  updateBestilling(kundenr, utleietype, kontant, gruppe, bestillingsid, success) {
    connection.query(
      'update Bestilling set kundenr=?, utleietype=?, kontant=?, gruppe =? where bestillingsid=?',
      [kundenr, utleietype, kontant, gruppe, bestillingsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  updateUbestilling(regnr, utstyrsid, detaljer, bestillingsid, ubid, success) {
    connection.query(
      'update Ubestilling set regnr=?, utstyrsid=?, detaljer=?, bestillingsid = ? where ubid=?',
      [regnr, utstyrsid, detaljer, bestillingsid, ubid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  slettBestilling(bestillingsid, success){
  connection.query('delete from Bestilling where bestillingsid = ?', [bestillingsid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
}
slettUbestilling(ubid, success){
connection.query('delete from Ubestilling where ubid = ?', [ubid] , (error, results) => {
  if(error) return console.error(error);

  success();
});
}
getBestillingFilt(fnavn, enavn, success) {
  connection.query('SELECT * FROM Bestilling B, Kunde K where B.kundenr = K.kundenr AND K.fnavn LIKE ? OR (B.kundenr = K.kundenr AND K.enavn LIKE ?)', [fnavn, enavn], (error, results) => {
    if (error) return console.error(error);

    success(results);
  });
}


}

export let bestillingsService = new BestillingsService();
