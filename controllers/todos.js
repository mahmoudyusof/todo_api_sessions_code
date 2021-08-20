const { Todo } = require("../db");
const { validationService } = require("../services");

const getAllTodos = async (req, res) => {
    try {
        const data = await Todo.find();
        res.json(data);
    } catch (e) {
        res.status(500).json({ ...e })
    }

}

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todo_id); // accessing the parameter passed in the route
        res.json(todo);
    } catch (e) {
        res.status(500).json({ ...e })
    }
}

const addTodo = async (req, res) => {
    // use the validation service to check if the request has valid data
    // if not return 400 Bad Request error, not 200
    // in the response include the message given by Joi (the validationService function)
    const { error } = validationService.validateTodo(req.body);
    if (error) {
        return res.status(400).json({ "message": error.details[0].message });
    }
    try {
        const todo = new Todo({ title: req.body.title, description: req.body.description });
        await todo.save();
        res.json({ "message": "saved", id: todo._id });
    } catch (e) {
        res.status(500).json({...e})
    }
}

module.exports = { getAllTodos, getTodoById, addTodo }