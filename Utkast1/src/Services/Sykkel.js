import { connection } from '../mysql_connection';

class SykkelService {
  getSykkel(sykkelid, success) {
    connection.query(
      'SELECT * FROM Sykkel S, Sykkeltype ST WHERE S.sykkeltypeid = ST.sykkeltypeid',
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
}

export let sykkelService = new SykkelService();
