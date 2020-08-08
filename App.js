import React, { useEffect } from 'react'
import TodoList from './todo/todolist'
import Context from './context'

import Loader from './Loader'

const AddTodo = React.lazy(() => import('./addTodo'))

function App() {
  /* const [todos, setTodos] = React.useState([]) */
  const [loading, setLoading] = React.useState(true)

  const [todos, setTodos] = React.useState([
    {id: 1, completed: false, title: 'Buy bread'},
    {id: 2, completed: false, title: 'Clean the house'},
    {id: 3, completed: false, title: 'Code for little bit'},
    {id: 4, completed: false, title: 'buy oil'},
    {id: 5, completed: false, title: 'buy milk'}
  ])

useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(response => response.json())
  .then(todos => {

    setTimeout(()=>{
      setTodos(todos)
      setLoading(false)
    },2000)
   
  })
}, [])

  function ToggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed 
       }
      return todo
    })  
    )
  }

function removeTodo(id){
  setTodos(todos.filter(todo => todo.id !== id))
}

function addTodo(title){
  setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
  }]))
}
  return (
    <Context.Provider value={{removeTodo}}>
      
    <div className='wrapper'>
      <h1>React tutorial</h1>  
        
        <React.Suspense fallback ={<p>Loading</p>}>
             <AddTodo onCreate = {addTodo}/>
        </React.Suspense>
        

        {loading && <Loader />}
      {todos.length ? (<TodoList todos ={todos} onToggle = {ToggleTodo} /> ) : 
      loading ? null : ( <p>No todos! </p>)}
      
    </div>

    </Context.Provider> 
  );
}

export default App;
