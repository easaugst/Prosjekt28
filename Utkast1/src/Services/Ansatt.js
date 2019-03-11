import { connection } from '../mysql_connection';

class AnsattService {
  getAnsatt(ansattnr, success) {
    connection.query('SELECT * FROM FastAnsatt', [ansattnr], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  addAnsatt(ansattnr, tlfnr, epost, fnavn,  enavn, admin, utleienavn, success) {
    connection.query(
      'insert into FastAnsatt (tlfnr, epost, fnavn, enavn, admin, utleienavn) values (?, ?, ?, ?, ?,?)',
      [ansattnr, tlfnr, epost, fnavn,  enavn, admin, utleienavn],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

}

export let ansattService = new AnsattService();
