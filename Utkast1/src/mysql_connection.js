import mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
export let connection;
function connect() {
  connection = mysql.createConnection({
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_idri1005_28',
    password: 'byNXaVPQ',
    database: 'g_idri1005_28'
  });

  // Connect to MySQL-server
  connection.connect(error => {
    if (error) console.error(error); // If error, show error in console and return from this function
  });

  // Add connection error handler
  connection.on('error', error => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect if connection to server is lost
      connect();
    } else {
      console.error(error);
    }
  });
}
connect();
