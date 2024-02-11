// import React, { useState } from "react";

// const TaskManager = () => {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (task:any) => {
//     setTasks([...tasks , task]);
//   };

//   const removeTask = (index:any) => {
//     const newTasks = [...tasks];
//     newTasks.splice(index, 1);
//     setTasks(newTasks);
//   };
  
//   return (
//     <div
//       style={{
//         display: "left",
//         alignItems:"left",
//         justifyContent: "left",
        
//       }}
//     >
//     <div className="task-manager">
//       <h3>Tasks</h3>
//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>
//             {task}
//             <button onClick={() => removeTask(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         placeholder="Add a task"
//         onKeyDown={(event) => {
//           if (event.key === "Enter") {
//             const taskInput = event.target;
//             addTask(taskInput.value);
//             taskInput.value = "";
//           }
//         }}
//       />
//     </div>
//     </div>
//   );
// };

// export default TaskManager;

interface Task {
  id: number;
  name: string;
}

class TaskManager {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public addTask(name: string): void {
    const newTask: Task = { id: Date.now(), name };
    this.tasks.push(newTask);
  }

  public removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }
}

const taskManager = new TaskManager();

// Example usage
taskManager.addTask("Task 1");
taskManager.addTask("Task 2");

console.log(taskManager.getTasks());

taskManager.removeTask(1673460168054); // Remove the task with id 1673460168054

console.log(taskManager.getTasks());