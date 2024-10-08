import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "0486577@Mm",
    port: 3306,
    connectionLimit: 10,
    connectTimeout: 300,
  });
  return conn;
}

function createMySQLPool() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "todo_db",
    password: "0486577@Mm",
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 300,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  return pool;
}

const myPool = createMySQLPool();

export async function getAllTodos() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELECT * FROM todos");

  return result[0];
}

export async function getAllTodosWithPool() {
  const result = await myPool.query("SELECT * FROM todos");

  return result[0];
}

async function createTodosTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos (
      id INT PRIMARY KEY AUTO_INCREMENT,
      task VARCHAR(255),
      status VARCHAR(255),
      created_at DATETIME DEFAULT(NOW())
    );
    `
  );
}

export async function createTodo(task: string, status: string) {
  const conn = await getMysqlConnection();

  const result = await conn.query(
    `INSERT INTO todos (task,status) VALUES ('${task}','${status}');`
  );

  return result[0];
}

export async function createTodoWithPool(task: string, status: string) {
  const result = await myPool.query(
    `INSERT INTO todos (task,status) VALUES ('${task}','${status}');`
  );

  return result[0];
}

export async function getTodoById(todoId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`SELECT * FROM todos WHERE id=${todoId}`);

  return result[0];
}

export async function getTodoByIdWithPool(todoId: number) {
  const result = await myPool.query(`SELECT * FROM todos WHERE id = ${todoId}`);

  return result[0];
}

export async function updateTodo(todoId: number, task: string, status: string) {
  const conn = await getMysqlConnection();

  const result = await conn.query(
    `UPDATE todos SET task ='${task}'  , status = '${status}' WHERE id=${todoId}`
  );

  return result[0];
}

export async function updateTodoWithPool(
  todoId: number,
  task: string,
  status: string
) {
  const result = await myPool.query(
    `UPDATE todos SET task ='${task}' , status = '${status}' WHERE id=${todoId}`
  );

  return result[0];
}

export async function deleteTodo(todoId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`DELETE FROM todos WHERE id = ${todoId}`);

  return result[0];
}

export async function deleteTodoWithPool(todoId: number) {
  const result = await myPool.query(`DELETE FROM todos WHERE id = ${todoId}`);

  return result;
}
