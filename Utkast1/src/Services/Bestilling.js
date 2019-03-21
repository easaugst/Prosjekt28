import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K where B.kundenr = K.kundenr', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getDelbestilling(ubid, bestillingsid, success) {
    connection.query('SELECT B.bestillingsid, U.regnr, U.ubid, U.utstyrsid, U.detaljer FROM Ubestilling U, Bestilling B where U.bestillingsid = B.bestillingsid and U.bestillingsid = ?', [ubid, bestillingsid], (error, results) => {
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
