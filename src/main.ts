import express from "express";
import {
  createTodoController,
  getAllTodoController,
  getTodoController,
} from "./controllers/todo-controller";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/get-todo/:todoId", getTodoController);
app.post("/create-todo", createTodoController);
app.post("/update-todo/:todoId", createTodoController);
app.delete("/delete-todo", getTodoController);
app.get("/get-all-todos", getAllTodoController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
