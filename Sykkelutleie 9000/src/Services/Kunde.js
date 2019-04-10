import { connection } from '../mysql_connection';


class KundeService {
  getKunde(success) {
    connection.query('SELECT * FROM Kunde', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getKundeEndring(kundenr, success) {
    connection.query(
      'SELECT * FROM Kunde WHERE kundenr = ?',
      [kundenr],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    )
  }
  getKundeFilt(navn, success){
    connection.query('SELECT * FROM Kunde WHERE fnavn LIKE ? OR (enavn LIKE ?)', [navn, navn] , (error, results) => {
      if(error) return console.error(error);

      success(results);
    });
  }
  countKunder(success) {
    connection.query('SELECT COUNT(kundenr) FROM Kunde',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  updateKunde(kundenr, fnavn, enavn, epost, tlf, success) {
    connection.query(
      'UPDATE Kunde SET fnavn=?, enavn =?, epost=?, tlf =? WHERE kundenr=?',
      [fnavn, enavn, epost, tlf, kundenr],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addKunde(fnavn, enavn, epost, tlf, fdag, success) {
    connection.query(
      'INSERT INTO Kunde (fnavn, enavn, epost, tlf, fdag) VALUES (?, ?, ?, ?, ?)',
      [fnavn, enavn, epost, tlf, fdag],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  newDate(success) {
    connection.query(
      'UPDATE Kunde SET fdag = DATE_ADD(fdag,INTERVAL 1 DAY) ORDER BY kundenr DESC LIMIT 1',
      (error,results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  slettKunde(kundenr, success){
    connection.query('DELETE FROM Kunde WHERE kundenr = ?', [kundenr] , (error, results) => {
      if(error) return console.error(error);

      success();
    });
  }
}


export let kundeService = new KundeService();
