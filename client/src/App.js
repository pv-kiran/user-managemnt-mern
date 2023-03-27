import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import User from './components/User';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoutes from './utils/PublicRoutes';

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>} />
       
       <Route element= {<PublicRoutes></PublicRoutes>}>
         <Route path="/signup" element={<Signup></Signup>} />
         <Route path="/signin" element={<Signin></Signin>} />
       </Route>

        <Route element={<ProtectedRoutes></ProtectedRoutes>}>
            <Route path="/user" element={<User></User>} />
        </Route>

        <Route element={<AdminProtectedRoutes></AdminProtectedRoutes>}>
            <Route path="/dashboard" element={<AdminDashboard></AdminDashboard>} />
        </Route>

      </Routes>
    </React.Fragment>
  );
}

export default App;



{/* <Route element={ <PublicRoutes/> }>
                <Route path='/register' element={ <SignupPage/> }/>
                <Route path='/login' element={ <LoginPage/> }/>
              </Route>
              <Route element={ <ProtectedRoutes/> }>
                <Route path='/' element={ <HomePage/> }/>
                <Route path='/profile' element={ <ProfilePage/> }/>
              </Route> */}