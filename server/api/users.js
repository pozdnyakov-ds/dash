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
          return data;
      }
  });

  switch(params.action) {

    case 'users.list':
      const users = await db_get(
        "SELECT id, name, surname, email, photo, scope, docs, status FROM users WHERE 1 ORDER BY name",
        []
      );
      if (!users) {
        setData(1, "Нет данных", null);
        return data;
      } else {
        setData(0, "Успешно", users);
        // console.log("SERVER USERS: ", users)
        return data;
      }
      break;

    case 'users.add':
      var id = Math.random().toString(32).slice(2);
      var statuses_set = '{"user":1,"admin":0,"owner":0}'
      var docs_set = '{"0":1}'

      const res0 = await db_get(
        "INSERT INTO users (id, name, surname, email, scope, docs, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, params.name, params.surname, params.email, statuses_set, docs_set, 0]
      );
      if (!res0) {
        setData(1, "Нет данных", null);
        return data;
      } else {
        setData(0, "Успешно", res0);
        return data;
      }
      break;

    case 'users.right':
      const rights = await db_get(
        "SELECT scope FROM users WHERE id=?",
        [params.id]
      );
      if (!rights) {
        setData(1, "Нет данных", null);
        return data;

      } else {
        let data = JSON.parse(rights[0].scope);
        data[params.right] = params.right_status

        const res1 = await db_update(
          "UPDATE users SET scope=? WHERE id=?",
          [JSON.stringify(data), params.id]
        );
        if (!res1) {
          setData(1, "Нет данных", null);
          return data;
        } else {
          setData(0, "Успешно", res1);
          return data;
        }

      }
      break;

    case 'users.get.docs':
      const docs = await db_get(
        "SELECT docs FROM users WHERE id=?",
        [params.id]
      );
      //console.log("SERVER DOCS: ", params.id, docs);

      if (!docs) {
        setData(1, "Нет данных", null);
        return data;
      } else {
        setData(0, "Успешно", docs[0]);
        return data;
      }
      break;

    case 'users.status':
      const res2 = await db_update(
        "UPDATE users SET status=? WHERE id=?",
        [params.status, params.id]
      );
      if (!res2) {
        setData(1, "Нет данных", null);
        return data;
      } else {
        setData(0, "Успешно", res2);
        console.log("users.status: ", res2);
        return data;
      }
      break;

    case 'users.docs.update':
      const docs_statuses = await db_get(
        "SELECT docs FROM users WHERE id=?",
        [params.user_id]
      );

      if (!docs_statuses) {
        setData(1, "Нет данных", null);
        return data;

      } else {
        let data = JSON.parse(docs_statuses[0].docs);
        data[params.id] = params.status;
//      console.log("new docs: ", data, " -> User: ", params.id);

        const res1 = await db_update(
          "UPDATE users SET docs=? WHERE id=?",
          [JSON.stringify(data), params.user_id]
        );
        if (!res1) {
          setData(1, "Нет данных", null);
          return data;
        } else {
          setData(0, "Успешно", res1);
          return data;
        }

      }
      break;

    case 'users.delete':
      const res3 = await db_update(
        "DELETE from users WHERE id=?",
        [params.id]
      );
      if (!res3) {
        setData(1, "Нет данных", null);
        return data;
      } else {
        setData(0, "Успешно", res3);
        return data;
      }
      break;
  }

});