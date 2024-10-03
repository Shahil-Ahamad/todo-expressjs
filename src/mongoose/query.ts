import { TodoModel } from "./schema";

export async function createTodoMongodb(
  task: string,
  description: string,
  status: string
) {
  const result = await TodoModel.create({
    task,
    description,
    status,
  });
  console.log("Created todo", result);
  return result;
}

export async function getAllTodoMongodb(
  task: string,
  description: string,
  status: string
) { 

  const result = await TodoModel.find( task, description, status  );
  console.log("Fetched todos:", result);
  return result;
}
export async function getTodoByIdMongodb(todoId: number) {
  const result = await TodoModel.findById(todoId);
  return result;
}
export async function updateTodoMongodb(
  todoId: string,
  task: string,
  description: string,
  status: string
) {
  const result = await TodoModel.findByIdAndUpdate(todoId);
  console.log("Updated todo:", result);
  return result;
}


export async function deleteTodoMongodb(todoId: string) {
  const result = await TodoModel.findByIdAndDelete(todoId);
  console.log("Deleted todo:", result);
  return result;
}