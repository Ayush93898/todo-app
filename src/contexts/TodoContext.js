import {createContext, useContext} from 'react'


// context bana lia
export const TodoContext = createContext({
    todos:[
        // prop of todos
        {
            id:1,
            todo:" Mera message ",
            completed: false
        }
    ],
    //fcuntionality
    addTodo: (todo)=> {},
    updateTodo:(id,todo)=> {},
    deleteTodo:(id)=> {},
    toggleComplete:(id)=> {}
}) 
export const useTodo = ()=>{   //custom hooks banake usecontext de dia
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider   // normal provider func , yha islia dedia jisse main file me jake wrap na karna pade