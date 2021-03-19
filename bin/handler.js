const mariadb = require('mariadb/callback');
let db;

var methods = {
  fetch: require('mariafire/lib/fetch'),
  set: require('mariafire/lib/set'),
  math: require('mariafire/lib/math'),
  push: require('mariafire/lib/push'),
  delete: require('mariafire/lib/delete'),
  has: require('mariafire/lib/has'),
  all: require('mariafire/lib/all'),
  type: require('mariafire/lib/type'),
  connect: require('mariafire/lib/connect')
 // table: require('mariafire/lib/table')
};

module.exports = {
   version: require("mariafire/package.json").version,
   
   fetch: async function(key, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('fetch', {stringify: true, id: key, ops: ops || {}}, this.tableName);
   },
   get: function(key, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
   },
   
   set: function(key, value, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     if (value === undefined) throw new TypeError('No value specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
   },
   
   add: function(key, value, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('math', {id: key, data: value, ops: ops || {}, type: "add"}, this.tableName);
   },

   subtract: function(key, value, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('math', {id: key, data: value, ops: ops || {}, type: "subtract"}, this.tableName);
   },
   
   push: function(key, value, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     if (!value && value != 0) throw new TypeError('Must specify value to push. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
   },
   
   delete: function(key, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('delete', {id: key, ops: ops || {}}, this.tableName);
   },
   
   has: function(key, ops, table) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
   },
   
   includes: function(key, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
   },
   
   all: function(ops) { 
     return arbitrate('all', {ops: ops || {}}, this.tableName);
   },
   
   fetchAll: function(ops) { 
     return arbitrate('all', {ops: ops || {}}, this.tableName);
   },
   
   type: function(key, ops) {
     if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
     return arbitrate('type', {id: key, ops: ops || {}});
   },
 
   connect: async function(ops) {
     db = await arbitrate('connect', {ops: ops || {}}, this.tableName);
     return db;
   },
   
   
   table: function(tableName, options = {}) {
   
     if (typeof tableName !== 'string') throw new TypeError('Table name has to be a string. Need Help? Check out: discord.gg/BGnqTQNG28');
     else if (tableName.includes(' ')) throw new TypeError('Table name cannot include spaces. Need Help? Check out: discord.gg/BGnqTQNG28');
     this.tableName = tableName;
     
     this.fetch = async function(key, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return await arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
     }
     
     this.get = function(key, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('fetch', {id: key, ops: ops || {}}, this.tableName);
     }
     
     this.set = function(key, value, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       if (!value && value != 0) throw new TypeError('No value specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('set', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
     }
     
     this.add = function(key, value, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('math', {id: key, data: value, ops: ops || {}}, this.tableName, true);
     }
     
     this.subtract = function(key, value, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       if (isNaN(value)) throw new TypeError('Must specify value to add. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('math', {id: key, data: value, ops: ops || {}}, this.tableName, false);
     }
     
     this.push = function(key, value, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       if (!value && value != 0) throw new TypeError('Must specify value to push. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('push', {stringify: true, id: key, data: value, ops: ops || {}}, this.tableName);
     }
     
     this.delete = function(key, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('delete', {id: key, ops: ops || {}}, this.tableName);
     }
     
     this.has = function(key, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
     }
     
     this.includes = function(key, ops) {
       if (!key) throw new TypeError('No key specified. Need Help? Check Out: discord.gg/BGnqTQNG28');
       return arbitrate('has', {id: key,  ops: ops || {}}, this.tableName);
     }
     
     this.fetchAll = function(ops) { 
       return arbitrate('all', {ops: ops || {}}, this.tableName);
     }
     
     this.all = function(ops) { 
       return arbitrate('all', {ops: ops || {}}, this.tableName);
     }
 
     this.connect = async function(ops) {
       db = await arbitrate('connect', {ops: ops || {}}, this.tableName);
       return db;
     }
     
   }
   
 }

async function arbitrate(method, params, table) {
  table = table || params.ops.table || 'soul'
  if(method == "connect") return methods[method](mariadb, params)

  await db.query(`CREATE TABLE IF NOT EXISTS ${table} (ID TEXT, data TEXT)`)

  if (params.ops.target && params.ops.target[0] === '.') params.ops.target = params.ops.target.slice(1); // Remove prefix if necessary
  if (params.data && params.data === Infinity) throw new TypeError(`You cannot set Infinity into the database @ ID: ${params.id}`)
  
  if (params.stringify) {
    try { params.data = JSON.stringify(params.data); } catch (e) 
    { throw new TypeError(`Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`); } 
  }
  
  if (params.id && params.id.includes('.')) {
    let unparsed = params.id.split('.');
    params.id = unparsed.shift();
    params.ops.target = unparsed.join('.');
  }
  
  return await await methods[method](db, params, table);
}
