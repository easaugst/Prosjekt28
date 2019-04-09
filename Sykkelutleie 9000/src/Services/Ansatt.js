import { connection } from '../mysql_connection';

class AnsattService {
  getAnsatt(success) {
    connection.query('SELECT * FROM FastAnsatt', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getAnsattFilt(navn, success) {    //Henter kun ansatte som har fornavn eller etternavn som likner på det brukeren skrev inn i søkefeltet
    connection.query('SELECT * FROM FastAnsatt WHERE fnavn LIKE ? OR enavn LIKE ?', [navn, navn], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  getAnsattEndring(ansattnr, success) {   //Henter spesifikk ansatt utifra ansattnr
    connection.query('SELECT * FROM FastAnsatt WHERE ansattnr = ?', [ansattnr],
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  countAnsatt(success) {    //Teller ansatte
    connection.query('SELECT COUNT(ansattnr) FROM FastAnsatt',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }

  addAnsatt(ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling, success) {   //Legger til ny ansatt
    connection.query(
      'INSERT INTO FastAnsatt (tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling) VALUES (?, ?, ?, ?, ?,?,?)',
      [ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateAnsatt(ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling, success) {    //Endrer en spesifikk ansatt
    connection.query(
      'UPDATE FastAnsatt SET tlfnr=?, epost =?, fnavn=?, enavn =?, admin =?, utleienavn =?, stilling =? WHERE ansattnr=?',
      [ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  slettAnsatt(ansattnr, success){   //Sletter en spesifikk ansatt
    connection.query('DELETE FROM FastAnsatt WHERE ansattnr = ?', [ansattnr] , (error, results) => {
      if(error) return console.error(error);

      success();
    });
  }

  ansattSignin(epost, pwd, success) {   //Sjekker login
    connection.query(
      'SELECT ansattnr, fnavn FROM FastAnsatt WHERE epost = ? AND pwd = ?',
      [epost, pwd],
      (error, results) => {
        if (error) return console.error(error);

        success(JSON.stringify(results));
      }
    )
  }
  adminSjekk(success){    //Sjekker om ansatt er admin
    connection.query('SELECT ansattnr FROM FastAnsatt WHERE admin = 1', [] , (error, results) => {
      if(error) return console.error(error);

      success(results);
    });
  }
}

export let ansattService = new AnsattService();
