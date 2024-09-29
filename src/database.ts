import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "0486577@Mm",
    port: 3306
  });
  return conn;
}

export async function getAllTodos() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELEC * FROM todos");

  console.log("getAllTodos Result:", result[0]);

  return result[0];
}

async function createTodosTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255),
      created_at DATETIME DEFAULT(NOW())
    );
    `
  );
}

async function createTodo(name: string) {
  // connection
  // insert into table sql query run
  // result return
}
