import { connection } from '../mysql_connection';

class SykkelService {
  getSykkel(sykkelid, success) {
    connection.query(
      'SELECT * FROM Sykkel S, Utleietype UT WHERE S.sykkeltypeid = UT.utid',
      [sykkelid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  addSykkel(sykkeltypeid, befinnelse, status, beskrivelse, utleienavn, success) {
    connection.query(
      'insert into Sykkel (sykkeltypeid, befinnelse, status, beskrivelse, utleienavn) values (?, ?, ?, ?, ?)',
      [sykkeltypeid, befinnelse, status, beskrivelse, utleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateSykkel(regnr, sykkeltypeid, befinnelse, status, beskrivelse, utleienavn, success) {
    connection.query(
      'update Sykkel set sykkeltypeid=?, befinnelse=?, status=?, beskrivelse=?, utleienavn=? where regnr=?',
      [regnr, sykkeltypeid, befinnelse, status, beskrivelse, utleienavn],
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
