import { connection } from '../mysql_connection';

class UtstyrService {
  getUtstyr(success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid',
      [],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  getUtstyrEndring(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid AND U.utstyrsid = ?',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getUtstyrFilt(utstyrstypeid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid AND U.utstyrstypeid = ?',
      [utstyrstypeid],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    )
  }
  countUtstyr(success) {
    connection.query('SELECT COUNT(utstyrsid) FROM Utstyr',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  addUtstyr(utstyrstypeid, ustatus, ubefinnelse, utsutleienavn, success) {
    connection.query(
      'INSERT INTO Utstyr (utstyrstypeid, ustatus, ubefinnelse, utsutleienavn) VALUES (?, ?, ?, ?)',
      [utstyrstypeid, ustatus, ubefinnelse, utsutleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateUtstyr(utstyrstypeid, ustatus, ubefinnelse, utsutleienavn, utstyrsid, success) {
    connection.query(
      'UPDATE Utstyr SET utstyrstypeid = ?, ustatus = ?, ubefinnelse=?, utsutleienavn=? WHERE utstyrsid = ?',
      [utstyrstypeid, ustatus, ubefinnelse, utsutleienavn, utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    )
  }

  slettUtstyr(utstyrsid, success){
  connection.query('DELETE FROM Utstyr WHERE utstyrsid = ?', [utstyrsid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
}


}

export let utstyrService = new UtstyrService();
