module.exports = async function(db, params, table) {
  var fetched;
  let resp = [];
  var a = Date.now();
//Codded By Soulfire
  async function fetch() {
    return await db.query(`SELECT * FROM ${table} WHERE ID IS NOT NULL`, (err, rows) => {
      if(err) return console.log(err);
      fetched = rows
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
    await JSON.parse(JSON.stringify(fetched)).forEach(async row => {
        resp.push({
          ID: row.ID,
          data: JSON.parse(row.data)
        })
    })
    return resp;
  };
//Codded By Soulfire
  async function finish() {
    await fetch();
    await new Promise(resolve => setTimeout(resolve, 10));
    console.log((Date.now() - a) + "ms")
    return resp;
  }
  return await finish();
}