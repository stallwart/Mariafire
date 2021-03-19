const unset = require('lodash/unset');

module.exports = async function(db, params, table) {
  var fetched;
  var a = Date.now();
//Codded By Soulfire
  async function fetch(fin = false) {
    await db.query(`SELECT * FROM ${table} WHERE ID = "${params.id}"`, (err, rows) => {
      if(err) return console.log(err);
      fetched = JSON.stringify(rows[0])
      return check(fin);
    });
  };
//Codded By Soulfire
  async function check(fin = false) {
    if (!fetched) return false;
    else return parse(fin)
  };
  //Codded By Soulfire
  async function parse(fin = false) {
    fetched = JSON.parse(fetched).data;
    try { fetched = JSON.parse(fetched) } catch (e) {};
    if(!fin) check2();
    else return fetched;
  };
//Codded By Soulfire
  async function check2(fin = false) {
    if (typeof fetched === 'object' && params.ops.target) {
      unset(fetched, params.ops.target);
      fetched = JSON.stringify(fetched);
      db.query(`UPDATE ${table} SET data = ${fetched} WHERE ID = ${params.id}`);
      return true;
    }
    else if (params.ops.target) throw new TypeError('Target is not an object.');
    else db.query(`DELETE FROM ${table} WHERE ID = ${params.id}`);
    return true;
  };
//Codded By Soulfire
  async function finish() {
    await fetch();
    await new Promise(resolve => setTimeout(resolve, 10));
    return fetched;
  }
  return await finish();
}
