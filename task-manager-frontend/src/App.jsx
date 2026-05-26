import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://task-manager-fullstack-1-t07v.onrender.com/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const loadTasks = async () => {
    setLoading(true)

    try {
      const response = await axios.get(API_URL)
      setTasks(response.data)
    } catch (error) {
      setMessage('Unable to load tasks right now.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAddTask = async (event) => {
    event.preventDefault()

    if (!title.trim()) {
      setMessage('Please enter a task title.')
      return
    }

    try {
      await axios.post(API_URL, {
        title,
        description,
        status: 'TODO'
      })

      setTitle('')
      setDescription('')
      setMessage('Task added successfully!')
      loadTasks()
    } catch (error) {
      setMessage('Could not add task. Please try again.')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setMessage('Task deleted.')
      loadTasks()
    } catch (error) {
      setMessage('Could not delete task.')
    }
  }

  const handleStatusUpdate = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        title: task.title,
        description: task.description,
        status: task.status
      })

      setMessage('Task status updated.')
      loadTasks()
    } catch (error) {
      setMessage('Could not update task status.')
    }
  }

  const updateLocalStatus = (taskId, newStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    )
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-5">Task Manager</h1>
          <p className="text-muted">A simple beginner-friendly task tracker for learning full stack development.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5">Add a new task</h2>
              <form onSubmit={handleAddTask}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Write a task title"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Add a short description"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Save Task
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">My Tasks</h2>
                {message && <span className="text-success">{message}</span>}
              </div>

              {loading && <p>Loading tasks...</p>}

              {!loading && tasks.length === 0 && (
                <p className="text-muted">No tasks yet. Add your first task to get started.</p>
              )}

              {!loading && tasks.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.title}</td>
                          <td>{task.description || 'No description'}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={task.status}
                              onChange={(event) => updateLocalStatus(task.id, event.target.value)}
                            >
                              <option value="TODO">To Do</option>
                              <option value="IN_PROGRESS">In Progress</option>
                              <option value="DONE">Done</option>
                            </select>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => handleStatusUpdate(task)}
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
