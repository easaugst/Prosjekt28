import { connection } from '../mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getUtstyr2(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid and U.utstyrstypeid = 4',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getUtstyr3(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utleietype UT WHERE U.utstyrstypeid = UT.utid and U.utstyrstypeid = 5',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }


  addUtstyr(utstyrsid, utstyrstypeid, ustatus, success) {
    connection.query(
      'insert into Utstyr (utstyrstypeid, ustatus) values (?, ?)',
      [utstyrsid, utstyrstypeid, ustatus],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateUtstyr(utstyrsid, utstyrstypeid, ustatus, success) {
    connection.query(
      'update Utstyr set utstyrstypeid=?, ustatus=? where utstyrsid=?',
      [utstyrsid, utstyrstypeid, ustatus],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    )
  }
}

export let utstyrService = new UtstyrService();
