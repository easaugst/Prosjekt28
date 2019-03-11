import { connection } from '../mysql_connection';

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling', [bestillingsid], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let bestillingsService = new BestillingsService();
