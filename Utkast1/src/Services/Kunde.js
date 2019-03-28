import { connection } from '../mysql_connection';


class KundeService {
  getKunde(kundenr, success) {
    connection.query('SELECT * FROM Kunde', [kundenr], (error, results) => {
      if (error) return console.error(error);

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
  slettKunde(kundenr, success){
    connection.query('delete from Kunde where kundenr = ?', [kundenr] , (error, results) => {
      if(error) return console.error(error);

      success();
    });
  }
  getKundeFilt(fnavn, enavn, success){
  connection.query('SELECT * FROM Kunde where fnavn LIKE ? OR (enavn LIKE ?)', [fnavn, enavn] , (error, results) => {
    if(error) return console.error(error);

    success(results);
  });
  }
}


export let kundeService = new KundeService();
