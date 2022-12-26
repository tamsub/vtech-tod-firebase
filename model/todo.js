import mongoose from "mongoose";
import { Schema, models, model } from "mongoose";

const todoSchema = new Schema({
	_id: String,
	todo: String,
	isCompleted: Boolean,
	createdAt: Number,
});

const Todos = models.todo || model("todo", todoSchema);

export default Todos;
