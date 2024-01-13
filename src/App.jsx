import React, { useState, useEffect } from "react";
import ToDoList from "./components/TodoList";

// ToDoApp component to manage the overall ToDo application
const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    console.log("Stored items:", storedItems);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
    console.log("Items saved to localStorage:", items);
  }, [items]);

  const handleAddEditItem = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a valid item.");
      return;
    }

    if (isEditing) {
      const updatedItems = [...items];
      updatedItems[editIndex] = inputValue;
      setItems(updatedItems);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setItems([...items, inputValue]);
    }

    setInputValue("");
  };

  const handleDeleteItem = (index) => {
    if (window.confirm("Are you sure?")) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const handleEditItem = (index) => {
    setInputValue(items[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="mx-auto mt-8 p-4 rounded font-mono">
      <h1 className="text-6xl font-bold mb-4 flex justify-center">ToDo List</h1>
      <div className="flex justify-center space-x-6 items-center h-20 w-full">
        <input
          type="text"
          placeholder="Add a new item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-400 w-[50%] rounded h-10 pl-6"
        />
        <button
          onClick={handleAddEditItem}
          className="bg-green-500 text-white h-10 rounded"
        >
          {isEditing ? "Edit Item" : "Add Item"}
        </button>
      </div>
      <h1 className="flex justify-center text-xl font-mono">List of Todos:</h1>
      <ToDoList
        items={items}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
};

export default App;
