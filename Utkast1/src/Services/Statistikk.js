import { connection } from '../mysql_connection';


class StatistikkService {

  getSykkelAntall(success) {
    connection.query(
      'select COUNT(regnr) from Sykkel',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  getSykkelUtleidAntall(success) {
    connection.query(
      'select COUNT(regnr) from Sykkel where status = "Utleid"',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }


}

export let statistikkService = new StatistikkService();
