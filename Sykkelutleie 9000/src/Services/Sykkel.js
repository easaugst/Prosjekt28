import { connection } from '../mysql_connection';

class SykkelService {
  getSykkel(success) {
    connection.query(
      'SELECT * FROM Sykkel S, Utleietype UT WHERE S.sykkeltypeid = UT.utid',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  getSykkelFilt(sykkeltypeid, success) {
    connection.query(
      'SELECT * FROM Sykkel S, Utleietype UT WHERE S.sykkeltypeid = UT.utid AND S.sykkeltypeid = ?',
      [sykkeltypeid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  getSykkelEndring(sykkelid, success) {
    connection.query(
      'SELECT * FROM Sykkel S, Utleietype UT WHERE S.sykkeltypeid = utid AND regnr = ?',
      [sykkelid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  countSykler(success) {
    connection.query('SELECT COUNT(regnr) FROM Sykkel',
    (error, results) => {
      if (error) console.error(error);

      success(JSON.stringify(results));
    });
  }

  addSykkel(sykkeltypeid, status, befinnelse, beskrivelse, utleienavn, success) {
    connection.query(
      'INSERT INTO Sykkel (sykkeltypeid, status, befinnelse, beskrivelse, utleienavn) VALUES (?, ?, ?, ?, ?)',
      [sykkeltypeid, status, befinnelse, beskrivelse, utleienavn],
      (error, results) => {
        if (error) return console.error(error);
        success();
      }
    );
  }

  updateSykkel(regnr, sykkeltypeid, status, befinnelse, beskrivelse, utleienavn, success) {
    connection.query(
      'UPDATE Sykkel SET sykkeltypeid=?, status=?, befinnelse=?, beskrivelse=?, utleienavn=? WHERE regnr=?',
      [regnr, sykkeltypeid, status, befinnelse, beskrivelse, utleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    )
  }

  slettSykkel(regnr, success){
  connection.query('DELETE FROM Sykkel WHERE regnr = ?', [regnr] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
}
}

export let sykkelService = new SykkelService();
