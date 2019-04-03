import { connection } from '../mysql_connection';

export class LokasjonService {
  getLokasjon(success) {
    connection.query('SELECT DISTINCT U.postnr, utleienavn, poststed, adresse FROM Utleiested U INNER JOIN Lokasjon L WHERE U.postnr = L.postnr',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  countLokasjoner(success) {
    connection.query('SELECT COUNT(postnr) FROM Utleiested',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }
}

export let lokasjonService = new LokasjonService();
