module.exports = async function(db, options) {
  const conn = await db.createConnection(options.ops);
  await conn.connect(err => {
    if (err) {
      console.log("not connected due to error: " + err);
    } else {
      console.log("connected ! connection id is " + conn.threadId);
    }
  });
  //Codded By Soulfire
  return conn;
}