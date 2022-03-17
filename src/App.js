import { useEffect, useState, createContext, useMemo, Suspense } from 'react';
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from './Pages/Home';
import Header from './Components/Header';
import Users from './Pages/Users';
import CircularProgress from '@mui/material/CircularProgress';

export const UsersContext = createContext();


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });

    return () => {
      localStorage.removeItem("user");
      console.log("USE EFFECT CLEAN UP");
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      users,
      setUsers
    }),
    [users]
  );



  console.log(contextValue)


  return (
    <Suspense fallback={<CircularProgress/>}>

    <BrowserRouter>
        <UsersContext.Provider value={contextValue}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </UsersContext.Provider>
    </BrowserRouter>
    </Suspense>

  );
}

export default App;
