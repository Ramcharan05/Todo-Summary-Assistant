import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getTodos = () => api.get('/todos')
export const createTodo = (todo) => api.post('/todos', todo)
export const deleteTodo = (id) => api.delete(`/todos/${id}`)
export const summarizeTodos = () => api.post('/summarize')