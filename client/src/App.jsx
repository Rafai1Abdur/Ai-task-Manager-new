import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Fetch tasks
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data));
  }, []);

  // Add task
  const addTask = async () => {
    if (!input) return;

    const res = await axios.post('http://localhost:5000/tasks', {
      text: input
    });

    setTasks([...tasks, res.data]);
    setInput('');
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  // AI Suggestion
  const getSuggestion = async () => {
    const res = await axios.post('http://localhost:5000/ai');
    setSuggestion(res.data.suggestion);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Task Manager</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />

      <button onClick={addTask}>Add</button>
      <button onClick={getSuggestion}>AI Suggestion</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>

      <p><b>AI:</b> {suggestion}</p>
    </div>
  );
}

export default App;