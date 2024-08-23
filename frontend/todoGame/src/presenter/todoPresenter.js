import { TodoService } from "../service/todoService";
import { Todo } from "../model/todo";
import { User } from "../model/user";

export class TodoPresenter {
    service = null;

    constructor() {
        this.service = new TodoService();
    }

    async getTodos() {
        try {
            const updatedTodos = await this.service.getTodos();
            const givenTodos = updatedTodos.todos.map(
                (todo) => new Todo(todo[0], todo[1], todo[2], todo[3])
            );

            return givenTodos
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    async addTodo(newTodoObj) {
        try {
            const response = await this.service.addTodo(newTodoObj);

            const updatedTodos = await this.service.getTodos();
            const givenTodos = updatedTodos.todos.map(
                (todo) => new Todo(todo[0], todo[1], todo[2], todo[3])
            );

            return givenTodos;
        } catch (error) {
            console.error(error);
        }
    }

    async completeTodo(id) {
        try {
            const {message, user} = await this.service.completeTodo(id);
            const updatedTodos = await this.service.getTodos();
            const givenTodos = updatedTodos.todos.map(
                (todo) => new Todo(todo[0], todo[1], todo[2], todo[3])
            );

            const updatedUser = new User(user.id, user.name, user.points);

            return {givenTodos, updatedUser}
        } catch (error) {
            console.error(error);
        }
    }
}