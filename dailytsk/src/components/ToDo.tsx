
import { useState } from "react"

export default function ToDo() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState<{ title: string; completed: boolean; description?: string }[]>([])

  const toggleTodo = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const addTask = () => {
    if (!title.trim()) return

    const newTask = {
      title: title.trim(),
      completed: false,
      description: description.trim() 
    }

    setTasks((prev) => [...prev, newTask])
    setTitle("")
    setDescription("")

  }

  const removeTask = () => {
    setTasks((prev) => prev.slice(0, -1))
  }

  return (
      <div className="task-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1>Daily Tasks</h1>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>
      <button onClick={removeTask}>Remove Task</button>

        <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTodo(index)}
              className={`task-item ${task.completed ? "completed" : ""}`}
          >
              <strong className="task-title">{task.title}</strong>
              {task.description && <p className="task-desc">{task.description}</p>}
          </li>
        ))}

      </ul>


    </div>
  )
}
