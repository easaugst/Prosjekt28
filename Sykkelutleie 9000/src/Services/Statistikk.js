import { connection } from '../mysql_connection';


class StatistikkService {

  getSykkelAntall(success) {
    connection.query(
      'SELECT COUNT(regnr) FROM Sykkel',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  getSykkelUtleidAntall(success) {
    connection.query(
      'SELECT COUNT(regnr) FROM Sykkel WHERE status != "Lager"',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  getUtstyrAntall(success) {
    connection.query(
      'SELECT COUNT(utstyrsid) FROM Utstyr',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  getUtstyrUtleidAntall(success) {
    connection.query(
      'SELECT COUNT(utstyrsid) FROM Utstyr WHERE ustatus != "Lager"',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }

  antallKunder(success) {
    connection.query(
      'SELECT COUNT(kundenr) FROM Kunde',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }

  antallBestillinger(success) {
    connection.query(
      'SELECT COUNT(bestillingsid) FROM Bestilling',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  antallDelBestillinger(success) {
    connection.query(
      'SELECT COUNT(ubid) FROM Ubestilling',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }



}

export let statistikkService = new StatistikkService();
