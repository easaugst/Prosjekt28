import { connection } from './mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
      connection.query('SELECT utstyrsid, utstyrstype FROM Utstyr', [utstyrsid], (error, results) => {

        if(error) return console.error(error);

        success(results);
      });
  }
}

class SykkelService {
  getSykkel(sykkelid, success) {
    connection.query('SELECT * FROM Sykkel', [sykkelid], (error, results) => {

      if(error) return console.error(error);

      success(results);
    });
  }
}


class KundeService {
  getKunde(kundeid, success) {
    connection.query('SELECT * FROM Kunde', [kundeid], (error, results) => {

      if(error) return console.error(error);

      success(results);
    });
  }
}

































//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
export let sykkelService = new SykkelService();
export let kundeService = new KundeService();
