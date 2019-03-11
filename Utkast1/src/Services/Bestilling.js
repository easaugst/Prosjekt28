import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling B, Kunde K where B.kundenr = K.kundenr', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getDelbestilling(ubid, regnr, utstyrsid, detaljer, bestillingsid, success) {
    connection.query('SELECT * FROM Ubestilling', [ubid, regnr, utstyrsid, detaljer, bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  updateBestilling(utleietype, gruppe, bestillingsid, success) {
    connection.query(
      'update Bestilling set utleietype=?, gruppe =? where bestillingsid=?',
      [utleietype, gruppe, bestillingsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}

export let bestillingsService = new BestillingsService();
