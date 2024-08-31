import './App.css';
import Signup from './Component/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Component/Login';
import Nav from './Component/nav';
import Add from './Component/Add';
import PrivateComponent from './Component/PrivateComponent'
import Home from './Component/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />} >
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={ <Add /> } />
        <Route path="/logout" element={<h1> logout Product listing component </h1>} />

        
        </Route>


        <Route path="/login" element={<Login />} />

        <Route path="/Signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;