import { useState } from 'react'
import { createTodo } from '../services/api'

export default function TodoForm({ onTodoAdded }) {
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTodo(newTodo)
      setNewTodo({ title: '', description: '' })
      onTodoAdded()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}