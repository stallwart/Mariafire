const get = require('lodash/get');

module.exports = async function(db, params, table) {
  var fetched;
  var a = Date.now();
//Codded By Soulfire
  async function fetch() {
    return await db.query(`SELECT * FROM ${table} WHERE ID = "${params.id}"`, (err, rows) => {
      if(err) return console.log(err);
      fetched = JSON.stringify(rows[0])
      return check();
    });
  };
//Codded By Soulfire
  async function check() {
    if (!fetched) return fetched = null;
    else return parse()
  };
  //Codded By Soulfire
  async function parse() {
    fetched = JSON.parse(fetched).data;
    try { fetched = JSON.parse(fetched) } catch (e) {};
    if (params.ops.target) fetched = get(fetched, params.ops.target);
    return fetched;
  };
//Codded By Soulfire
  async function finish() {
    await fetch();
    await new Promise(resolve => setTimeout(resolve, 5));
    console.log((Date.now() - a) + "ms")
    return fetched;
  }
  return await finish();
}
