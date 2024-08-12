import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/Todoform";
import TodoItem from "./components/Todoitem";

function App() {
  // sari fn-lity yhi define kar dege
  const [todos, settodos] = useState([]); // sare todos ko hum array me store kar lege

  //add-todo
  // todo from se ayga
  const addTodo = (todo) => {
    settodos((oldTodos) => [{ id: Date.now(), ...todo }, ...oldTodos]);
    // oldtodo mtlb purane todos i.e an object, like prev ..agr mai seedka settodos(todo) karuga toh purane wale delete ho jayge, oldtodo is previous state of array
  };

  //update-todo
  const updateTodo = (id, todo) => {
    settodos((oldtodos) =>
      oldtodos.map((oldtodo) => (oldtodo.id === id ? todo : oldtodo))
    );
  };
  // kuchni kara bus chnage kar dia oldtodo ko naye todo se

  // delete-todo
  const deleteTodo = (id) => {
    settodos((oldtodos) => oldtodos.filter((oldtodo) => oldtodo.id !== id));
  };
  // humko poora array rakhna hia bus ek ko chodh ke, toh bus us ek ki id jis se mili usko hata do

  // toggle complete

  const toggleComplete = (id)=>{
    settodos((oldtodos)=>oldtodos.map((oldtodo)=> oldtodo.id===id?{...oldtodo,completed: !oldtodo.completed}:oldtodo))
  }
  //oldtodo ko spread kara as wo ek single todo hai usme teen value hai, toh usme completed ko ovveride kar dege


  //local-Storage
  //values string me hogi but hume toh json me chaiye

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      settodos(todos)
    }
  },[])

  // now i want if i add another value then it automatically add to local storage 
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}
    >
<div
  className="min-h-screen py-12 flex justify-center items-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1523248948644-586f1ab2a83e?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
  }}
>
  <div
    className="w-full max-w-3xl mx-auto bg-gradient-to-b from-[#dba8ff2f] to-[#194ff051] shadow-2xl rounded-3xl px-8 py-10"
    style={{
      opacity: 1, // Adjust this value for desired transparency (0.0 - fully transparent, 1.0 - fully opaque)
    }}
  >
    <h1
      className="text-7xl  text-center mb-12 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1d200c] via-[#7e1111] to-[#050d2a] animate-gradient-x drop-shadow-2xl head"
      style={{
        animation: "glow 1.5s ease-in-out infinite alternate",
      }}
    >
      Echo Your Tasks
    </h1>

    <div className="mb-8">
      {/* Todo form goes here */}
      <TodoForm />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Loop and Add TodoItem here */}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-4 bg-gradient-to-r from-[#6a5acd] via-[#7b68ee] to-[#483d8b] rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300"
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  </div>
</div>


    </TodoProvider>
  );
}

export default App;
