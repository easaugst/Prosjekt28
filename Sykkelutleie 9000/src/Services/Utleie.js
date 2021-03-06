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
  updateSykkel(regnr, status, success) {
      connection.query(
        'UPDATE Sykkel SET status=? WHERE regnr=?',
        [status, regnr],
        (error, results) => {
          if (error) return console.error(error);

          success(results);
        }
      )
  }

  tilgjengeligeSykler(success) {
    connection.query(
      'SELECT sykkeltypeid, COUNT(regnr) AS tilgjengelig FROM Sykkel WHERE status = "Lager" GROUP BY sykkeltypeid',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  tilgjengeligUtstyr(success) {
    connection.query(
      'SELECT utstyrstypeid, COUNT(utstyrsid) AS tilgjengelig FROM Utstyr WHERE ustatus = "Lager" GROUP BY utstyrstypeid',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }

  getUtstyr(utstyrstypeid, antall, success) {
    connection.query(
      'SELECT utstyrsid FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid AND U.ustatus = "Lager" AND U.utstyrstypeid = ? LIMIT ?',
      [utstyrstypeid, antall],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  updateUtstyr(utstyrsid, ustatus, success) {
    connection.query(
      'UPDATE Utstyr SET ustatus = ? WHERE utstyrsid = ?',
      [ustatus, utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  countTyper(success) {
    connection.query(
      'SELECT COUNT(utid) FROM Utleietype',
      (error, results) => {
        if (error) return console.error(error);

        success(JSON.stringify(results));
      }
    )
  }
  getTyper(success) {
    connection.query(
      'SELECT * FROM Utleietype',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  getSykkelTyper(success) {
    connection.query(
      'SELECT * FROM Utleietype WHERE kategori ="sykkel"',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  getUtstyrTyper(success) {
    connection.query(
      'SELECT * FROM Utleietype WHERE kategori = "Utstyr"',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  addBestilling(kundenr, ansattnr, utleiested, utleietype, kontant, ftid, ttid, gruppe, success) {
    connection.query(
      'INSERT INTO Bestilling (kundenr, ansattnr, utleiested, utleietype, kontant, ftid, ttid, gruppe) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [kundenr, ansattnr, utleiested, utleietype, kontant, ftid, ttid, gruppe],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addUBestillingSykkel(regnr, bestillingsid, success) {
    connection.query(
      'INSERT INTO Ubestilling (regnr, bestillingsid) VALUES (?, ?)',
      [regnr, bestillingsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  addUBestillingUtstyr(utstyrsid, bestillingsid, success) {
    connection.query(
      'INSERT INTO Ubestilling (utstyrsid, bestillingsid) VALUES (?, ?)',
      [utstyrsid, bestillingsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getBestilling(success) {
  connection.query(
    'SELECT MAX(bestillingsid) FROM Bestilling',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
      }
    );
  }
  sjekkBagasjebrett(success) {
    connection.query('SELECT utid FROM Utleietype WHERE bagasjebrett = 1',
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let utleieService = new UtleieService();
