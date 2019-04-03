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
      'select COUNT(regnr) from Sykkel where status != "Lager"',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  getUtstyrAntall(success) {
    connection.query(
      'select COUNT(utstyrsid) from Utstyr',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  getUtstyrUtleidAntall(success) {
    connection.query(
      'select COUNT(utstyrsid) from Utstyr where ustatus != "Lager"',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }

  antallKunder(success) {
    connection.query(
      'select COUNT(kundenr) from Kunde',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }

  antallBestillinger(success) {
    connection.query(
      'select COUNT(bestillingsid) from Bestilling',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }
  antallDelBestillinger(success) {
    connection.query(
      'select COUNT(ubid) from Ubestilling',
      (error, results) => {
        if (error) return console.error(error);
        success(JSON.stringify(results));
      }
    );
  }



}

export let statistikkService = new StatistikkService();
