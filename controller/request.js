const con = require("../config/sql");
class request {
  async getRequest(_, res) {
    const sql = `SELECT * FROM requests`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  }

  async xacNhanYeuCau(req, res) {
    const { id } = req.body;
    var sql = `UPDATE requests SET trang_thai = '0' WHERE id = '${id}'`;
    con.query(sql, function (err, _) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Xác nhận yêu cầu thất bại" });
      }
      res
        .status(200)
        .json({ success: true, message: "Xác nhận yêu cầu thành công" });
    });
  }

  async tuChoiYeuCau(req, res) {
    const { id } = req.body;
    var sql = `UPDATE requests SET trang_thai = '-1' WHERE id = '${id}'`;
    con.query(sql, function (err, _) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Từ chối yêu cầu thất bại" });
      }
      res
        .status(200)
        .json({ success: true, message: "Từ chối yêu cầu thành công" });
    });
  }
  async sendRequest(req, res) {
    const { tai_khoan, so_tien, thong_tin1, thong_tin2 } = req.body;
    var sql = `INSERT INTO requests (tai_khoan, so_tien, thong_tin1, thong_tin2) VALUES ('${tai_khoan}', '${so_tien}', '${thong_tin1}', '${thong_tin2}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result.affectedRows);
    });
  }
  async getRequestObject(req, res) {
    const { tai_khoan } = req.query;
    const sql = `SELECT * FROM requests WHERE tai_khoan = '${tai_khoan}'`;
    con.query(sql, async function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  }
}
module.exports = new request();
