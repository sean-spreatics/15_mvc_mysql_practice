const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'kdt',
});

exports.post_signup = (data, cb) => {
  const sql = `INSERT INTO user (userid, name, pw) VALUES ('${data.userid}','${data.name}','${data.pw}')`;
  conn.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('post_singup', rows);
    // OkPacket {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 0,
    //     serverStatus: 2,
    //     warningCount: 0,
    //     message: '',
    //     protocol41: true,
    //     changedRows: 0
    //   }
    cb();
  });
};

exports.post_signin = (data, cb) => {
  const sql = `SELECT * FROM user WHERE userid='${data.userid}' and pw='${data.pw}' LIMIT 1`;
  conn.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    cb(rows);
  });
};

// 로그인한 유저 한 명을 가져옴!
exports.post_profile = (userid, cb) => {
  const sql = `SELECT * FROM user WHERE userid='${userid}' LIMIT 1`;
  conn.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    console.log('Model User: ', rows);
    cb(rows);
  });
};

exports.edit_profile = (data, cb) => {
  const sql = `UPDATE user SET userid='${data.userid}', name='${data.name}', pw='${data.pw}' WHERE id='${data.id}'`;
  conn.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    cb();
  });
};

exports.delete_profile = (id, cb) => {
  conn.query(`DELETE FROM user WHERE id='${id}'`, (err, rows) => {
    if (err) {
      throw err;
    }

    cb();
  });
};
