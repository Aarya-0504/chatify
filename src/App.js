import Register from './pages/Register';
import Login from './pages/Login'
import Home from './pages/Home';
import { BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
// import { CurrentUser } from './Context/AuthContext';
// import Login from './pages/Login';
// impot

function App() {

  // const navigate=useNavigate();
  const {user}=useContext(AuthContext)

  const ProtectedRoute=({children})=>{
    if(!user)
      return <Navigate to="/login"/>
    return children
    
  }
  
  console.log(user)
  
  return (
    <div className="App">
    <Router>
    <Routes>
    <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
