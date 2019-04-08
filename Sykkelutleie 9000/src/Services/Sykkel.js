import { connection } from '../mysql_connection';

class SykkelService {
  getSykkel(success) {
    connection.query(
      'SELECT * FROM Sykkel S, Utleietype UT WHERE S.sykkeltypeid = UT.utid',
      [],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  countSykler(success) {
    connection.query('SELECT COUNT(regnr) FROM Sykkel',
    (error, results) => {
      if (error) console.error(error);

      success(JSON.stringify(results));
    });
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

  addSykkel(sykkeltypeid, status, befinnelse, beskrivelse, utleienavn, success) {
    connection.query(
      'insert into Sykkel (sykkeltypeid, status, befinnelse, beskrivelse, utleienavn) values (?, ?, ?, ?, ?)',
      [sykkeltypeid, status, befinnelse, beskrivelse, utleienavn],
      (error, results) => {
        if (error) return console.error(error);
        success();
      }
    );
  }

  updateSykkel(regnr, sykkeltypeid, status, befinnelse, beskrivelse, utleienavn, success) {
    connection.query(
      'update Sykkel set sykkeltypeid=?, status=?, befinnelse=?, beskrivelse=?, utleienavn=? where regnr=?',
      [regnr, sykkeltypeid, status, befinnelse, beskrivelse, utleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    )
  }

  slettSykkel(regnr, success){
  connection.query('delete from Sykkel where regnr = ?', [regnr] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
}
}

export let sykkelService = new SykkelService();
