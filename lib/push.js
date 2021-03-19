const get = require('lodash/get');
const set = require('lodash/set');

module.exports = async function(db, params, table) {
  var fetched;
  var t;
  var f;
  var a = Date.now();
//Codded By Soulfire
  async function fetch(fin = false) {
    if(fin) return check(fin);
    await db.query(`SELECT * FROM ${table} WHERE ID = "${params.id}"`, (err, rows) => {
      if(err) return console.log(err);
      console.log(rows)
      fetched = JSON.stringify(rows[0]) 
      return check(fin);
    });
  };
//Codded By Soulfire
  async function check(fin = false) {
    if(!fin) return check2();
  };
//Codded By Soulfire
  async function check2() {
    if(!fetched) [fetched = { ID: params.id, data: { array: [] } }, f = true]
    try { fetched = JSON.parse(fetched) } catch (e) {};
    params.data = JSON.parse(params.data).array;
    if (fetched.data.array === '{}') fetched.data.array = [];
    try { fetched.data = JSON.parse(fetched.data) } catch (e) {};
    console.log(fetched.data.array)
    if (!Array.isArray(fetched.data.array)) throw new TypeError('Target is not an array.');
    var temp = ["SOULFIRETESTISTE"];
    temp.push(params.data);
    fetched.data.array = temp.concat(fetched.data.array);
    if(f) return create();
    else return update();
  };
//Codded By Soulfire
  async function create() {
    console.log("create krşm")
    console.log(fetched)
    db.query(`INSERT INTO ${table} (ID,data) VALUES ("${params.id}", { 'array': ${fetched.data} })`, (err, rows) => {
      if(err) return console.log(err);
  
      return update()
    });
  }
//Codded By Soulfire
  async function update() {
    await db.query(`UPDATE ${table} SET data = { 'array': ${fetched.data} } WHERE ID = "${fetched.id}"`, (err, results) => {
      t = fetched
      return fetch(true);
    })
  };

  async function finish() {
    await fetch();
    await new Promise(resolve => setTimeout(resolve, 50));
    console.log((Date.now() - a) + "ms")
    return JSON.parse(JSON.stringify(t));
  }

return await finish();
};