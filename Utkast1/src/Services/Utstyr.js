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
}

//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
