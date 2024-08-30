import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaStar, FaSearch, FaCog, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';
import navLogo from "../assests/logo.png";

const Home = () => {
  const [lists, setLists] = useState([
    { name: 'Personal', tasks: [], completedTasks: [] },
    { name: 'Work', tasks: [], completedTasks: [] },
    { name: 'Shopping', tasks: [], completedTasks: [] },
    { name: 'Fitness', tasks: [], completedTasks: [] },
  ]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [newTask, setNewTask] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState(''); 
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedLists = [...lists];
      updatedLists[currentListIndex].tasks.push({
        taskName: newTask,
        dueDate: newTaskDueDate,
      });
      setLists(updatedLists);
      setNewTask('');
      setNewTaskDueDate(''); 
    }
  };

  const completeTask = (taskIndex) => {
    const updatedLists = [...lists];
    const task = updatedLists[currentListIndex].tasks.splice(taskIndex, 1)[0];
    updatedLists[currentListIndex].completedTasks.push(task);
    setLists(updatedLists);
  };

  const addList = () => {
    if (newListName.trim() !== '') {
      setLists([...lists, { name: newListName, tasks: [], completedTasks: [] }]);
      setNewListName('');
    }
  };

  const calculateCompletionPercentage = () => {
    const totalTasks = lists[currentListIndex].tasks.length + lists[currentListIndex].completedTasks.length;
    const completedTasks = lists[currentListIndex].completedTasks.length;
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className={`flex min-h-screen font-sans ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {isSidebarVisible && (
        <aside className={`w-64 shadow-md p-6 flex flex-col justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div>
            <div className="text-center mb-6">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" 
                alt="Profile" 
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
              <h3 className={`mt-4 text-lg font-semibold ${isDarkMode ? 'text-red-300' : 'text-red-900'}`}>Hey, ABCD</h3>
            </div>

            <nav className="mb-8">
              <ul>
                {lists.map((list, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                      index === currentListIndex 
                        ? `${isDarkMode ? 'bg-red-500 text-red-100' : 'bg-red-100 text-red-700'}`
                        : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                    }`}
                    onClick={() => setCurrentListIndex(index)}
                  >
                    <FaTasks className="mr-3 text-xl" />
                    <span className="font-medium">{list.name}</span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6">
              <input 
                type="text" 
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="New List Name"
                className={`w-full mb-3 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600 focus:ring-red-500' : 'border-gray-300 focus:ring-red-400'}`}
              />
              <button 
                className={`w-full py-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-600 text-white hover:bg-red-700'}`}
                onClick={addList}
              >
                + Add List
              </button>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-red-500 text-red-100' : 'bg-red-50 text-red-800'}`}>
            <h4 className="text-lg font-semibold">{lists[currentListIndex].name} Tasks</h4>
            <div className="flex justify-center items-center mt-4">
              <p className="text-2xl font-bold mr-4">{lists[currentListIndex].tasks.length + lists[currentListIndex].completedTasks.length}</p>
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={calculateCompletionPercentage()}
                  text={`${calculateCompletionPercentage()}%`}
                  styles={buildStyles({
                    textColor: isDarkMode ? '#fff' : '#333',
                    pathColor: isDarkMode ? '#f56565' : '#c53030',
                    trailColor: isDarkMode ? '#4a5568' : '#e2e8f0',
                  })}
                />
              </div>
            </div>
          </div>
        </aside>
      )}

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img src={navLogo} alt="Logo" className="h-14" />
            <FaBars
              className={`text-xl cursor-pointer hover:text-red-600 transition-colors duration-200 ml-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <FaSearch className={`text-xl cursor-pointer hover:text-red-600 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <FaCog className={`text-xl cursor-pointer hover:text-red-600 transition-colors duration-200 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-800" />}
            </button>
          </div>
        </header>

        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-[#2F3630] text-gray-100' : 'bg-white text-gray-900'}`}>
          <div className="flex items-center mb-6">
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add A Task" 
              className={`flex-grow py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600 focus:ring-red-500' : 'border-gray-300 focus:ring-red-400'}`}
            />
            <input 
              type="date" 
              value={newTaskDueDate} 
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className={`ml-4 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600 focus:ring-red-500' : 'border-gray-300 focus:ring-red-400'}`}
            />
            <button 
              className={`ml-4 py-2 px-6 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-600 text-white hover:bg-red-700'}`} 
              onClick={addTask}
            >
              ADD TASK
            </button>
          </div>

          <div className="mb-6">
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>To Do</h2>
            <ul>
              {lists[currentListIndex].tasks.map((task, index) => (
                <li 
                  key={index} 
                  className={`flex justify-between items-center p-3 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
                >
                  <div className="flex items-center ">
                    <input 
                      type="checkbox" 
                      className={`mr-3 h-5 w-5 focus:ring-red-400 rounded ${isDarkMode ? 'bg-gray-800 text-red-600' : 'text-red-600'}`}
                      onChange={() => completeTask(index)}
                    />
                    <span className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>{task.taskName}</span>
                    {task.dueDate && (
                      <span className={`ml-4 text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-800'}`}>Completed</h2>
            <ul>
              {lists[currentListIndex].completedTasks.map((task, index) => (
                <li 
                  key={index} 
                  className={`flex justify-between items-center p-3 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
                >
                  <div className="flex items-center">
                    <FaStar className={`mr-3 text-xl ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <span className={`${isDarkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'}`}>{task.taskName}</span>
                    {task.dueDate && (
                      <span className={`ml-4 text-sm ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
