import sqlite3 from 'sqlite3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = {...body }

  const data = {
    error: null,
    message: "",
    docs: null
  };

  function setData(err, mess, docs) {
    data.error = err;
    data.message = mess;
    data.docs = docs
  }

  async function db_get(query, params){
    return new Promise(function(resolve, reject) {
        db.all(query, params, function(err, data) {
           if (err) { return reject(err); }
           resolve(data);
         });
    });
  }

  async function db_update(query, params){
    return new Promise(function(resolve, reject) {
        db.run(query, params, function(err, data) {
           if (err) { return reject(err); }
           resolve(data);
         });
    });
  }

  let db = new sqlite3.Database(
    `./db/${process.env.DATABASE}.db`,
    sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
          setData(1, "Ошибка соединения", null);
          return { data: null }
      }
  });

  switch(params.action) {
    case 'users.list':
      const users = await db_get(
        "SELECT id, name, surname, email, photo, scope, status FROM users WHERE 1 ORDER BY name",
        []
      );
      if (!users) {
        setData(1, "Нет данных", null);
        return { data: null }
      } else {
        setData(0, "Успешно", users);
        return { data: users }
      }
      break
      
    case 'users.status':
      const result = await db_update(
        "UPDATE users SET status=? WHERE id=?",
        [params.status, params.id]
      );
      if (!result) {
        setData(1, "Нет данных", null);
        return { data: null }
      } else {
        setData(0, "Успешно", result);
        console.log("users.status: ", result);
        return { data: result }
      }
      break
  }
  
});