const con = require("../config/sql");
const hash = require("../config/hash");
class user {
  async getUser(_, res) {
    const sql = `SELECT * FROM users`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  }

  async dongTaiKhoan(req, res) {
    const { tai_khoan } = req.body;
    var sql = `UPDATE users SET trang_thai = '0' WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, function (err, _) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Lỗi đóng tài khoản" });
      }
      res
        .status(200)
        .json({ success: true, message: "Đóng tài khoản thành công" });
    });
  }

  async moTaiKhoan(req, res) {
    const { tai_khoan } = req.body;
    var sql = `UPDATE users SET trang_thai = '1' WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Lỗi mở tài khoản" });
      }
      res
        .status(200)
        .json({ success: true, message: "Mở tài khoản thành công" });
    });
  }

  async signUp(req, res) {
    const { tai_khoan, mat_khau } = req.body;
    const mk = await hash.hashPassword(mat_khau);
    const sql = `SELECT * FROM users WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        var sql = `INSERT INTO users (tai_khoan, mat_khau) VALUES ('${tai_khoan}', '${mk}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.json(result.affectedRows);
        });
      } else {
        res.json(0);
      }
    });
  }

  async signIn(req, res) {
    const { tai_khoan, mat_khau } = req.body;
    const sql = `SELECT * FROM users WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      if (result.length == 1) {
        let compare = await hash.comparePassword(mat_khau, result[0].mat_khau);
        res.json(compare ? 1 : 0);
      } else {
        res.json(0);
      }
    });
  }

  async congTien(req, res) {
    const { tai_khoan, so_tien } = req.body;
    const sql = `SELECT * FROM users WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      if (result.length == 1) {
        const st =
          Number.parseInt(so_tien) + Number.parseInt(result[0].so_tien);
        var sql = `UPDATE users SET so_tien = '${st}' WHERE tai_khoan = '${tai_khoan}'`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.json(result.affectedRows);
        });
      } else {
        res.json(0);
      }
    });
  }

  async truTien(req, res) {
    const { tai_khoan, so_tien } = req.body;
    const sql = `SELECT * FROM users WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      if (result.length == 1) {
        const st =
          Number.parseInt(result[0].so_tien) - Number.parseInt(so_tien);
        if (st >= 0) {
          var sql = `UPDATE users SET so_tien = '${st}' WHERE tai_khoan = '${tai_khoan}'`;
          con.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result.affectedRows);
          });
        } else {
          res.json(0);
        }
      } else {
        res.json(0);
      }
    });
  }

  async kiemTraSoTien(req, res) {
    const { tai_khoan } = req.body;
    const sql = `SELECT * FROM users WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      res.json(...result);
    });
  }
}
module.exports = new user();
