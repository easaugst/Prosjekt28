import { connection } from './mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
      connection.query('SELECT utstyrsid, utstyrstype FROM Utstyr', [utstyrsid], (error, results) => {

        if(error) return console.error(error);

        success(results);
      });
  }
}
































//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
