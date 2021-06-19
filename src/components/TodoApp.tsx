import React, { useState, useEffect } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

var getTodoState = () => {
  return TodoStore.getAll();
};

const TodoApp = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(getTodoState);

  useEffect(() => {
    TodoStore.addChangeLister(() => { _onChange() });
  }, [])

  const componentWillUnmount = () => {
    TodoStore.removeEventListener(_onChange());
  };

  const _destroy = (e: any) => {
    var id: string = e.target.parentNode.id;
    TodoActions.destroy(id);
  };

  const _submit = () => {
    TodoActions.create(value);
    setValue('');
  };

  const _Input = (e: any) => {
    setValue(e.target.value);
  };

  const _onChange = () => {
    setTodos(getTodoState)
  }

  var todoElements = [];

  for(var key in todos) {
    todoElements.push(
        <li key={ key }>
        <span style={{ marginRight: "30px" }}>{ todos[key].text }</span>
        <button onClick={ (e) => _destroy(e) }>&:times;</button>
        </li>
        )
  };

  return (
  <div>
    <input type="text" value={ value } onChange={ (e) => _Input(e) }/>
    <button onClick={ () => _submit() }>Add.</button>
    <ul>
      { todoElements }
    </ul>
  </div>
  )
}

export default TodoApp;
