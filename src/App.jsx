import React, { useState } from 'react';
import './styles/custom.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;

    setTodos([
      ...todos,
      { id: Date.now(), text: task.trim(), completed: false }
    ]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Add this function to calculate progress
  const getProgress = () => {
    if (todos.length === 0) return 0;
    const completedTasks = todos.filter(todo => todo.completed).length;
    return `${completedTasks}/${todos.length}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold text-center">List Todo</h1>
          <div className="progress-container">
            <div className="progress-text">
              <h2>Task Done</h2>
              <p>Keep it up</p>
            </div>
            <div className="progress-fraction">{getProgress()}</div>
          </div>
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Enter a task"
            className="flex-grow p-2 border rounded-l"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center text-gray-400">No tasks added</li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
              >
                <span
                  onClick={() => toggleComplete(todo.id)}
                  className={`cursor-pointer flex-grow ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
