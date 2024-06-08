import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './views/Login';
import Register from './views/Register';
import AppHome from "./views/AppHome";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="*" element={<AppHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
