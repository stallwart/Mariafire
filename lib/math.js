module.exports = async function(db, params, table) {
  var fetched;
  var a = Date.now();

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
    if(!fin) check2();
    else return fetched;
  };
//Codded By Soulfire
  async function check2() {
    try { fetched = JSON.parse(fetched) } catch (e) {}
    if (fetched.data === '{}') fetched.data = 0;
    if (isNaN(fetched.data)) throw new Error(`Data @ ID: "${params.id}" IS NOT A number.\nFOUND: ${fetched.data}\nEXPECTED: number`);
    fetched.data = params.type == "add" ? parseInt(fetched.data, 10) + parseInt(params.data, 10) : parseInt(fetched.data, 10) - parseInt(params.data, 10);
    return update();
  };
//Codded By Soulfire
  async function update() {
    db.query(`UPDATE ${table} SET data = ${fetched.data} WHERE ID = "${params.id}"`);
    return fetch(true);
  };
//Codded By Soulfire
  async function finish() {
    await fetch();
    await new Promise(resolve => setTimeout(resolve, 50));
    console.log((Date.now() - a) + "ms")
    return JSON.parse(fetched);
  }

  return await finish();
};