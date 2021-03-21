
---

**Mariafire** is an **open-sourced** package meant to provide an easy way for beginners, and people of all levels to access & manage a database. **All data is stored persistently**, and comes with various extra features.

---

- **Persistent storage w/ no setup** *(Data doesn't disappear through restarts)*
- Beginner Friendly
- [Discord Support](https://discord.gg/BGnqTQNG28)
- **Multiple tables support**
- **and more!**

---

![Examples](https://github.com/xsoulfire)

> _All data in mariafire is stored **persistently** in a database. Here is an example of setting an object in the database, then fetching parts & the full object._

```js
const db = require('mariafire');

//Connection
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };
(async () => {
    await db.connect({ host: 'localhost', user:'ahmet', port: 3306, password: 'mariafiretest', database: 'testdb', connectionLimit: 5}, 'soul')  
  
    console.log(db.version)
 
// Setting an object in the database:
db.set('userInfo', { difficulty: 'Easy' })
// -> { difficulty: 'Easy' }

// Pushing an element to an array (that doesn't exist yet) in an object:
db.push('userInfo.items', 'Sword')
// -> { difficulty: 'Easy', items: ['Sword'] }

// Adding to a number (that doesn't exist yet) in an object:
db.add('userInfo.balance', 500)
// -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

// Repeating previous examples:
db.push('userInfo.items', 'Watch')
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
db.add('userInfo.balance', 500)
// -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }

// Fetching individual properties
db.get('userInfo.balance') // -> 1000
db.get('userInfo.items') // ['Sword', 'Watch']
})()

```
---

![Installation](https://github.com/xsoulfire)

**Linux & Windows**
- `npm i mariafire`

**Mac**
1. **Install:** XCode
2. **Run:** `npm i -g node-gyp` in terminal
3. **Run:** `node-gyp --python /path/to/python2.7` (skip this step if you didn't install python 3.x)
4. **Run:** `npm i mariafire`

---

![What is mariafire?](https://github.com/xsoulfire/mariafire)

> Mariafire is an easy to use database wrapper for MYSQL, it was designed to be simple to let new users who are just getting into development and don't want to worry about learning SQL just quite yet.

---
