import { connection } from '../mysql_connection';

class AnsattService {
  getAnsatt(ansattnr, success) {
    connection.query('SELECT * FROM FastAnsatt', [ansattnr], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  countAnsatt(success) {
    connection.query('SELECT COUNT(ansattnr) FROM FastAnsatt',
    (error, results) => {
      if (error) return console.error(error);

      success(JSON.stringify(results));
    });
  }
  getAnsattEndring(ansattnr, success) {
    connection.query('SELECT * FROM FastAnsatt WHERE ansattnr = ?', [ansattnr],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      });
  }

  addAnsatt(ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling, success) {
    connection.query(
      'insert into FastAnsatt (tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling) values (?, ?, ?, ?, ?,?,?)',
      [ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  updateAnsatt(ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling, success) {
    connection.query(
      'update FastAnsatt set tlfnr=?, epost =?, fnavn=?, enavn =?, admin =?, utleienavn =?, stilling =? where ansattnr=?',
      [ansattnr, tlfnr, epost, fnavn, enavn, admin, utleienavn, stilling],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }
  ansattSignin(epost, pwd, success) {
    connection.query(
      'SELECT ansattnr FROM FastAnsatt where epost = ? AND pwd = ?',
      [epost, pwd],
      (error, results) => {
        if (error) return console.error(error);

        success(JSON.stringify(results));
      }
    )
  }
  adminSjekk(success){
  connection.query('Select ansattnr from FastAnsatt where admin = 1', [] , (error, results) => {
    if(error) return console.error(error);

    success(results);
  });
}
  slettAnsatt(ansattnr, success){
  connection.query('delete from FastAnsatt where ansattnr = ?', [ansattnr] , (error, results) => {
    if(error) return console.error(error);

    success();
  });
}
getAnsattFilt(fnavn, enavn,success) {
  connection.query('SELECT * FROM FastAnsatt Where fnavn LIKE ? OR enavn LIKE ?', [fnavn,enavn], (error, results) => {
    if (error) return console.error(error);

    success(results);
  });
}

}

export let ansattService = new AnsattService();
