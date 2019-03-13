import { connection } from '../mysql_connection';

class UtleieService {

  getDropdown(success) {
    connection.query('SELECT * FROM Kunde ORDER BY kundenr ASC', (error, results) => {
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

export let utleieService = new UtleieService();
