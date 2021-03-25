import Header from "./components/header/header.component";
import Tasks from "./components/tasks/tasks.component";
import { useState, useEffect } from "react";
import AddTask from "./components/add-task/add-task.component";

function App() {
  const [isForm, setForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleChange = () => setForm(!isForm);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // // const addTask = (task) => {
  // //   const id = Math.floor(Math.random() * 10000) + 1;
  // //   const newTask = { id, ...task };
  // //   setTasks({ ...tasks, newTask });
  // // };

  // //Add Task

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    console.log(data);

    return data;
  };

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        text: task.text,
        day: task.day,
        reminder: task.reminder,
      },
    ]);
  };
  // console.log(tasks);

  //Delete task

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle reminder

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        handleChange={handleChange}
        buttonChange={isForm}
      />
      {isForm ? (
        <div>
          <AddTask onAdd={addTask} />
          {tasks.length > 0 ? (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
          ) : (
            "No Tasks to show!"
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
