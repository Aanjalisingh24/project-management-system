import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/adminroute";
import Dashboard from "./pages/dashboard";
import Addclient from "./pages/Client_page/addclient";
import AllClient from "./pages/Client_page/allclient";
import Updateclient from "./pages/Client_page/updateclient"
import PublicNavbar from "./component/publicnavbar";
import Privatenavbar from "./component/privatenavbar";
import Allproject from "./pages/Project_page/allproject";
import Alltask from "./pages/Task_page/alltask";
import Addproject from "./pages/Project_page/addproject";
import Addtask from "./pages/Task_page/addtask";
import Updateproject from "./pages/Project_page/updateproject";
import Updatetask from "./pages/Task_page/updatetask";
import Userdashboard from './pages/userdashboard';
import UserNavbar from './component/UserNavbar';
import User_project from "./pages/User_page/user_project";
import User_task from "./pages/User_page/user_task";

function App() {
  return (
    <>
  <Routes>
    <Route
      path="/"
      element={
        <>
          <PublicNavbar />
          <Register />
        </>
      }
    />

    <Route
      path="/login"
      element={
        <>
          <PublicNavbar />
          <Login />
        </>
      }
    />

    <Route
      path="/dashboard"  allowedRole="admin"
      element={
        <>
          <Privatenavbar />
           < AdminRoute/>
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </>
      }
    />

    <Route
  path="/userdashboard"
  element={
    <>
    <UserNavbar/>
    < AdminRoute/>
      <Userdashboard />
      </>
  }
/>

<Route
  path="/user_project"
  element={
    <>
    <UserNavbar/>
      <User_project />
      </>
  }
/>


<Route
  path="/user_task"
  element={
    <>
    <UserNavbar/>
      <User_task />
      </>
  }
/>



    <Route
      path="/Allclient"
      element={
        <>
          <Privatenavbar />
          <AllClient />
        </>
      }
    />

     <Route
      path="/addtask"
      element={
        <>
          <Privatenavbar />
          <Addtask/>
        </>
      }
    />

    <Route
      path="/addclient"
      element={
        <>
          <Privatenavbar />
          <Addclient />
        </>
      }
    />
    <Route
      path="/addproject"
      element={
        <>
          <Privatenavbar />
          <Addproject />
        </>
      }
    />

    <Route
      path="/UpdateClient/:id"
      element={
        <>
          <Privatenavbar />
          <Updateclient />
        </>
      }
    />

    <Route
      path="/Updateproject/:id"
      element={
        <>
          <Privatenavbar />
          <Updateproject />
        </>
      }
    />

    <Route
      path="/Updatetask/:id"
      element={
        <>
          <Privatenavbar />
          <Updatetask />
        </>
      }
    />

    <Route
    path="/getproject"
    element={
      <>
      <Privatenavbar />
      <Allproject />
      </>
    }
    />

    <Route
    path="/alltask"
    element={
      <>
      <Privatenavbar/>
      <Alltask/>
      </>
    }
    />
  </Routes>
  </>
  );
}

export default App; 