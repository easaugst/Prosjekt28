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
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid and U.utstyrstypeid = ?',
      [ utstyrstypeid],
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    )
  }

  addUtstyr(utstyrsid, utstyrstypeid, ustatus, success) {
    connection.query(
      'insert into Utstyr (utstyrstypeid, ustatus) values (?, ?)',
      [utstyrstypeid, ustatus],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateUtstyr(utstyrsid, utstyrstypeid, ustatus, success) {
    connection.query(
      'UPDATE Utstyr SET utstyrstypeid = ?, ustatus = ? WHERE utstyrsid = ?',
      [utstyrstypeid, ustatus, utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    )
  }

  slettUtstyr(utstyrsid, success){
  connection.query('delete from Utstyr where utstyrsid = ?', [utstyrsid] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
}


}

export let utstyrService = new UtstyrService();
