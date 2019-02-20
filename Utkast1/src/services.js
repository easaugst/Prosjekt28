import { connection } from './mysql_connection';

class UtstyrService {
  getSykkel(success) {
      connection.query('SELECT * FROM Utstyr', (error, results) => {

        if(error) return console.error(error);

        success(results);
      });
  }
}
