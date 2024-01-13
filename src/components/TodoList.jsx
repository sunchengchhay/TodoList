// ToDoList.js
import React from "react";

const ToDoList = ({ items, onEdit, onDelete }) => {
  return (
    <ul className="list-disc text-lg font-mono space-y-2 w-[56%] mx-auto bg-gray-100 mt-5">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between items-center">
          <span className="mr-2">
            {index + 1}.<span className="pl-10">{item}</span>
          </span>
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
