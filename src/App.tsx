import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Contact from "./pages/Contact/Contact";



function App() {

  return (
    <div className="App">
        <Header/>
          <Routes>
              <Route path={'/'}  element={<Home/>}/>
              <Route path={'/:id'}  element={<Contact/>}/>
          </Routes>
    </div>
  )
}

export default App
