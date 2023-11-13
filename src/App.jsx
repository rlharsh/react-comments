import { useState } from "react";

// Layouts
import HomeLayout from "./Components/Layouts/HomeLayout";
import { getAllComments } from "./Helpers/API";
import AuthenticationContext, { AuthenticationProvider } from "./Providers/AuthenticationContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comments from "./Components/Comments/Comments";

import "./app.css";

function App() {
  return (
    <div className="container application">
      <AuthenticationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Comments />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
