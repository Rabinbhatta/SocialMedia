import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom"
import Login from "./component/login";
import { Navbar } from "./component/navbar";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/"  element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
