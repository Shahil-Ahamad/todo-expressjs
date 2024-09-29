import express, { Request, Response, NextFunction } from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  getTodoController,
  updateTodoController,
} from "./controllers/todo-controller";

const PORT = 4000;

const app = express();

app.use(express.json());

app.get("/get-todo/:todoId", getTodoController); // done
app.post("/create-todo", createTodoController); // done
app.put("/update-todo/:todoId", updateTodoController);
app.delete("/delete-todo/:todoId", deleteTodoController);
app.get("/get-all-todos", getAllTodoController); // done

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: "something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});