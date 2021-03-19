const set = require('lodash/set');

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
    if (!fetched) create();
    else return parse(fin)
  };
//Codded By Soulfire
  async function create() {
    db.query(`INSERT INTO ${table} (ID,data) VALUES ("${params.id}","{}")`, (err, rows) => {
      if(err) return console.log(err);
      return fetch()
    });
  }
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
      params.data = JSON.parse(params.data);
      params.data = set(fetched, params.ops.target, params.data);
    } else if (params.ops.target) throw new TypeError('Cannot target a non-object.');
    params.data = JSON.stringify(params.data);
    return update();
  };
//Codded By Soulfire
  async function update() {
    db.query(`UPDATE ${table} SET data = ${params.data} WHERE ID = "${params.id}"`);
    return fetch(true);
  };
  //Codded By Soulfire
  async function finish() {
    await fetch();
    await new Promise(resolve => setTimeout(resolve, 10));
    console.log((Date.now() - a) + "ms")
    console.log(fetched)
    return JSON.parse("{ \"" + params.id + "\": \"" + fetched + "\"}");
  }
  return await finish();
}
