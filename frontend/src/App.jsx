import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { getTodos, createTodo, deleteTodo, summarizeTodos } from './services/api'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const handleSummarize = async () => {
    try {
      const { data } = await summarizeTodos()
      setMessage(data)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.response?.data || 'Error generating summary')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="app-container">
      <h1>Todo Summary Assistant</h1>
      {message && <div className="message-banner">{message}</div>}
      
      <TodoForm onTodoAdded={fetchTodos} />
      
      <TodoList todos={todos} onTodoDeleted={fetchTodos} />
      
      <button 
        className="summary-button"
        onClick={handleSummarize}
      >
        Generate Slack Summary
      </button>
    </div>
  )
}

export default App