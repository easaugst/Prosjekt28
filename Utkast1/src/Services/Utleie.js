import { connection } from '../mysql_connection';

class UtleieService {

  getDropdown(success) {
    connection.query('SELECT * FROM Kunde ORDER BY kundenr ASC', (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  getSykler(sykkeltypeid, antall, success) {
    connection.query(
      'SELECT regnr FROM Sykkel S, Utleietype UT WHERE S.sykkeltypeid = UT.utid AND S.status = "Lager" AND S.sykkeltypeid = ? LIMIT ?',
      [sykkeltypeid, antall],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  addBestilling(kundenr, utleietype, kontant, ftid, gruppe, success) {
    connection.query(
      'insert into Bestilling (kundenr, utleietype, kontant, ftid, gruppe) values (?, ?, ?, ?, ?)',
      [kundenr, utleietype, kontant, ftid, gruppe],
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
