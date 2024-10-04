"use client";
import { Pencil, Trash2 } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface Task {
  text: string;
  completed: boolean;
}
const TodoApp = () => {
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [editText, setEditText] = useState("");

  const handleAddTAsk = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMainTask([...mainTask, { text: task, completed: false }]);
    setTask("");
  };
  const handleDelete = (i: number) => {
    const delTask = [...mainTask];
    delTask.splice(i, 1);
    setMainTask(delTask);
  };
  const handleCheckboxChange = (index: number) => {
    const updatedTasks = mainTask.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setMainTask(updatedTasks);
  };
  const handleUpdateTask = (index: number) => {
    const updatedTasks = mainTask.map((t, i) =>
      i === index ? { ...t, text: editText } : t
    );
    setMainTask(updatedTasks);
    setIsEditing(null); // Close edit mode after updating
  };

  const Task = mainTask.map((t, i) => {
    return (
      <>
        <div className="mt-4 relative" key={i}>
          <ul className="p-1 ring-2 ring-slate-700 rounded-md text-gray-300 flex gap-2 items-center">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => handleCheckboxChange(i)}
            />
            {isEditing === i ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-transparent outline-none p-1 text-lg"
              />
            ) : (
              <li className={t.completed ? "line-through" : ""}>{t.text}</li>
            )}
            <button
              className="absolute right-0 ring-1 p-1 rounded-md bg-red-500"
              onClick={() => handleDelete(i)}
            >
              <Trash2 />
            </button>
            <button
              className="absolute right-12 ring-1 p-1 rounded-md bg-green-500"
              onClick={() => {
                if (isEditing === i) {
                  handleUpdateTask(i); // Save changes
                } else {
                  setIsEditing(i); // Start editing
                  setEditText(t.text); // Load current text into the input
                }
              }}
            >
              {isEditing === i ? "Save" : <Pencil />}
            </button>
          </ul>
        </div>
      </>
    );
  });
  return (
    <div>
      <div className="ring-1 ring-slate-900 bg-slate-800 text-white shadow-lg shadow-slate-500 p-4 rounded-md">
        <h1 className="text-center font-bold text-2xl py-4 ">To-Do App</h1>
        <form
          action=""
          className="rounded-md space-x-4 flex items-center"
          onSubmit={handleAddTAsk}
        >
          <input
            type="text"
            value={task}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
            placeholder="Enter your Task"
            className="bg-transparent outline-none ring-2 ring-slate-700 rounded-md p-1 text-sm sm:text-lg"
          />
          <button className="ring-2 ring-slate-700 bg-slate-800 text-white px-2 py-1 rounded-md text-sm sm:text-lg ">
            Add Task
          </button>
        </form>
        {Task}
      </div>
    </div>
  );
};

export default TodoApp;
