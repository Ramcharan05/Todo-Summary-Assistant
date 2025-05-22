import { deleteTodo } from '../services/api'

export default function TodoList({ todos, onTodoDeleted }) {
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      onTodoDeleted()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo.id} className="todo-item">
          <div className="todo-content">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <span className={`status ${todo.completed ? 'completed' : 'pending'}`}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          <button 
            className="delete-button"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}