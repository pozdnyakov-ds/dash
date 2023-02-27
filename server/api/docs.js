import sqlite3 from 'sqlite3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const params = {...body }

  const data = {
    error: null,
    message: "",
    docs: null
  };

  function setData(err, mess, docs) {
    data.error = err;
    data.message = mess;
    data.docs = docs;
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
          return data
      }
  });

  switch(params.action) {
    case 'docs.list':
      const all_docs = await db_get(
        "SELECT id, name, description, parent, path, doc_order, status FROM docs WHERE 1 ORDER BY doc_order",
        []
      );

      all_docs.forEach((doc) => {
        doc.id = Number(doc.id);
        doc.parent = doc.parent != 'NULL' ? Number(doc.parent) : null;
        doc.docs = doc.docs && doc.docs.length > 0 && JSON.parse(doc.docs) ? JSON.parse(doc.docs) : "{}";
      });

      if (!all_docs) {
        setData(1, "Нет данных", null);
        return data;

      } else {
        setData(0, "Есть данные", all_docs);
        return data;
      }
      break;
  }

});