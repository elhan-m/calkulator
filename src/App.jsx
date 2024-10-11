// import React, { useState } from 'react';
// import { SunOutlined, MoonOutlined } from '@ant-design/icons';

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [result, setResult] = useState(null);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const calculateResult = () => {
//     const operators = ['+', '-', '*', '/'];
//     let operator = operators.find(op => inputValue.includes(op));

//     if (operator) {
//       const [num1, num2] = inputValue.split(operator).map(Number);
//       if (!isNaN(num1) && !isNaN(num2)) {
//         let calcResult;
//         switch (operator) {
//           case '+': calcResult = num1 + num2; break;
//           case '-': calcResult = num1 - num2; break;
//           case '*': calcResult = num1 * num2; break;
//           case '/': calcResult = num2 !== 0 ? num1 / num2 : 'Катачылык: нөлгө бөлүү'; break;
//           default: calcResult = 'Жараксыз операция';
//         }
//         setResult(calcResult);
//       } else {
//         setResult('Жараксыз киргизүү');
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       calculateResult();
//     }
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
//       <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-lg p-6 w-80`}>
//         <div className="flex justify-between items-center mb-4">
//           <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Калькулятор</h1>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             {darkMode ? <SunOutlined className="text-yellow-400" /> : <MoonOutlined className="text-gray-600" />}
//           </button>
//         </div>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//           placeholder="Туюнтманы киргизиңиз"
//           className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
//         />
//         <div className="grid grid-cols-4 gap-2 mb-4">
//           {['+', '-', '*', '/'].map((op) => (
//             <button
//               key={op}
//               onClick={() => {
//                 setInputValue(prev => prev + op);
//               }}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
//             >
//               {op}
//             </button>
//           ))}
//         </div>
//         <button
//           onClick={calculateResult}
//           className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 mb-4"
//         >
//           Эсептөө
//         </button>
//         {result !== null && (
//           <div className={`text-lg font-semibold text-center p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} rounded`}>
//             Жыйынтык: {result}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        setPhotos(response.data.slice(0, 10));
      })
      .catch(error => console.error('Error fetching photos:', error));
  }, []);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data.slice(0, 10).map(todo => ({...todo, underlined: false})));
      })
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleUnderline = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, underlined: !todo.underlined} : todo
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <section className="flex items-center justify-center h-screen text-center">
            <div className="text-white animate-fade-in">
              <h1 className="text-5xl font-bold mb-6">Welcome to Todo App!</h1>
              <p className="text-xl">Explore users, photos, and todos from JSONPlaceholder.</p>
            </div>
          </section>
        );
      case 'users':
        return (
          <section className="container mx-auto py-10">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">Users</h2>
            <ul className="space-y-4">
              {users.map(user => (
                <li
                  key={user.id}
                  className="bg-white p-6 rounded-xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-100"
                >
                  <p className="text-gray-700 font-bold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      case 'photos':
        return (
          <section className="container mx-auto py-10">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">Photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.map(photo => (
                <div
                  key={photo.id}
                  className="bg-white p-4 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="mt-4 text-center text-gray-700">{photo.title}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case 'todos':
        return (
          <section className="container mx-auto py-10">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">Todos</h2>
            <ul className="space-y-4">
              {todos.map(todo => (
                <li
                  key={todo.id}
                  className="bg-white p-6 rounded-xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-100"
                >
                  <p className={`font-bold ${todo.completed ? 'text-green-600' : 'text-red-600'} ${todo.underlined ? 'underline' : ''}`}>
                    {todo.title}
                  </p>
                  <p className="text-gray-500">Completed: {todo.completed ? 'Yes' : 'No'}</p>
                  <div className="mt-4 space-x-2">
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleUnderline(todo.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      {todo.underlined ? 'Remove Underline' : 'Underline'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="bg-opacity-80 bg-gray-900 text-white p-6 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">Todo App</h1>
          <ul className="flex space-x-8">
            <li>
              <button
                onClick={() => setCurrentPage('home')}
                className="hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('users')}
                className="hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('photos')}
                className="hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Photos
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('todos')}
                className="hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Todos
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;