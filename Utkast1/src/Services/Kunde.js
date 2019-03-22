import { connection } from '../mysql_connection';


class KundeService {
  getKunde(kundenr, success) {
    connection.query('SELECT * FROM Kunde', [kundenr], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  updateKunde(kundenr, fnavn, enavn, epost, tlf, success) {
    connection.query(
      'update Kunde set fnavn=?, enavn =?, epost=?, tlf =? where kundenr=?',
      [fnavn, enavn, epost, tlf, kundenr],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addKunde(kundenr, fnavn, enavn, epost, tlf, fdag, success) {
    connection.query(
      'insert into Kunde (fnavn, enavn, tlf, epost, fdag) values (?, ?, ?, ?, ?)',
      [kundenr, fnavn, enavn, epost, tlf, fdag],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  newDate(success) {
    connection.query(
      'UPDATE Kunde set fdag = DATE_ADD(fdag,INTERVAL 1 DAY) ORDER BY kundenr DESC LIMIT 1',
      [],
      (error,results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
}


export let kundeService = new KundeService();
