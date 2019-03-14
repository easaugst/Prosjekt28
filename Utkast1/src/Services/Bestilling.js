import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K where B.kundenr = K.kundenr', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getDelbestilling(ubid, bestillingsid, success) {
    connection.query('SELECT B.bestillingsid, U.ubid, S.regnr, U.utstyrsid, U.detaljer FROM Ubestilling U, Bestilling B, Sykkel S, Utstyr UT where U.bestillingsid = B.bestillingsid and U.regnr = S.regnr and U.utstyrsid = UT.utstyrsid and U.bestillingsid = ?', [ubid, bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
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
}

export let bestillingsService = new BestillingsService();
