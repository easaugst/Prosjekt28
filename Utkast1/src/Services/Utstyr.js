import { connection } from '../mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utstyrstype UT WHERE U.utstyrstypeid = UT.utstyrstypeid',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getUtstyr2(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utstyrstype UT WHERE U.utstyrstypeid = UT.utstyrstypeid and U.utstyrstypeid = 1',
      [utstyrsid],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  getUtstyr3(utstyrsid, success) {
    connection.query(
      'SELECT * FROM Utstyr U, Utstyrstype UT WHERE U.utstyrstypeid = UT.utstyrstypeid and U.utstyrstypeid = 2',
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
