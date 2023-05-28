import { useState } from 'react';
import './App.css';
import data from './data';

function App() {
   const [todos, setTodos] = useState(data.todos);
   const [displayTodos, setDisplayTodos] = useState(data.todos)
   const [inputTask, setInputTask] = useState('');

  function deleteTodo(id)  {
    const filterTodo = todos.filter(e => e.id !== id)
   setDisplayTodos(filterTodo)
   setTodos(filterTodo);
  } 

  function deleteAll() {
   setDisplayTodos([])
   setTodos([])
  }

  function filterTodo(target) {
    if(target == 'completed') {
      let completedTodos = todos.filter(e => e.completed == true);
      setDisplayTodos(completedTodos);
    } else if(target == 'left') {
      let leftTodos = todos.filter(e => e.completed == false);
      setDisplayTodos(leftTodos);
    } else {
      setDisplayTodos(todos)
    }
  }
  const handleChange = (id) => {
    let updatedList = todos.map((todo) => {
      if(todo.id === id){
        return {
          ...todo,
         completed: true
        }
      }
      return todo
   })
   setDisplayTodos([...updatedList])
   setTodos([...updatedList])
  }

  const handleInputChange = (e) => {
    setInputTask(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([{
      todo: inputTask,
      completed: false,
      id:todos.length+1,
    }, ...todos,  ])
    setDisplayTodos([{
      todo: inputTask,
      completed: false,
      id: displayTodos.length+1
    }, ...displayTodos, ]);
    setInputTask('');
  }

  return (
    <div className="App">
       <div className='container'>
       <h2 className='heading'>Todo List</h2>
       <div className='d-flex flex-column flex-lg-row justify-content-between align-items-center m-2 m-lg-4'>
       <div className='d-flex'>
        <h3 className='mb-0'>Filter: </h3>
        <button id="all" className="filter-button" onClick={(e) => filterTodo(e.target.id)}>All</button>
        <button id="completed" className="filter-button" onClick={(e) => filterTodo(e.target.id)}>Completed</button>
        <button id="left" className="filter-button" onClick={(e) => filterTodo(e.target.id)}>To do</button>
        </div>
        <div className='delete-all'>
          <p className='mb-0'>Delete All</p>
          <i className='fa fa-times' onClick={deleteAll}></i>
        </div>
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="todo" className="todo-input" value={inputTask} placeholder="Enter a task..." onChange={handleInputChange} />
            <button type='submit' className='filter-button'>Add</button>
           </form>
        <p className='text-center'>Todos: {displayTodos.length}</p>
        <div className='items'>
        {displayTodos.length > 0 ? displayTodos.map(todo => {
          return <div key={todo.id}>
            <div className='todo-item'>
            <input type="checkbox" className="todo-check" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => handleChange(todo.id)}/>
            <label htmlFor={`todo-${todo.id}`} className='item-name'>{todo.todo}</label>
           <i className="delete-icon fa fa-trash" onClick={() => deleteTodo(todo.id)}></i>
           </div>
           <p>{todo.completed}</p>
          </div>
        }) : <p>No todos</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
