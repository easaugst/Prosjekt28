import { connection } from './mysql_connection';

class UtstyrService {
  getUtstyr(utstyrsid, success) {
      connection.query('SELECT * FROM Utstyr U, Utstyrstype UT WHERE U.utstyrstype = UT.utstyrstypeid', [utstyrsid], (error, results) => {

        if(error) return console.error(error);

        success(results);
      });
  }
}

class SykkelService {
  getSykkel(sykkelid, success) {
    connection.query('SELECT * FROM Sykkel S, Sykkeltype ST WHERE S.sykkeltypeid = ST.sykkeltypeid', [sykkelid], (error, results) => {

      if(error) return console.error(error);

      success(results);
    });
  }
}


class KundeService {
  getKunde(kundeid, success) {
    connection.query('SELECT * FROM Kunde', [kundenr], (error, results) => {

      if(error) return console.error(error);

      success(results);
    });
  }
}

class BestillingsService {
  getBestilling(bestillingsid, success) {
    connection.query('SELECT * FROM Bestilling', [bestillingsid], (error, results) => {

      if(error) return console.error(error);

      success(results);
    });
  }
}

































//LA ATÅ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export let utstyrService = new UtstyrService();
export let sykkelService = new SykkelService();
export let kundeService = new KundeService();
export let bestillingsService = new BestillingsService();
