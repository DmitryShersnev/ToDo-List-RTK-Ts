import "./App.css";

import ToDo from "./ToDo";
import { Routes, Route } from "react-router";
import RegLog from "./login/RegLog";
import PrivateRoute from "./login/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/reglog" element={<RegLog />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<ToDo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
