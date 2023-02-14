import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campground from "./pages/Campground";
import CreateCampground from "./pages/CreateCampground";
import CampgroundEdit from "./pages/CampgroundEdit";
// context
import { UserProvider, initState } from "./contexts/UserContext";

const App = () => {
  return (
    <UserProvider user={initState.user}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/campgrounds" element={<Campgrounds />} />
            <Route
              index
              path="/campground/create"
              element={<CreateCampground />}
            />
            <Route index path="/campground/:campId" element={<Campground />} />
            <Route
              index
              path="/campground/:campId/edit"
              element={<CampgroundEdit />}
            />
            <Route index path="/page/:pageNumber" element={<Campgrounds />} />
            <Route index path="/Login" element={<Login />} />
            <Route index path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </UserProvider>
  );
};

export default App;
