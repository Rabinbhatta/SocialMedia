import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./component/login";
import Home from "./component/home";
import Messenger from "./component/messenger";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home"  element={<Home/>}/>
      <Route path="/message" element={<Messenger/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
