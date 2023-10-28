import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Pages/Dashboard';
import Reset from './Pages/Reset';
import Verifyreset from './Pages/Verifyreset';
import ViewQuiz from './Pages/ViewQuiz';


function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <BrowserRouter className='flex items-center justify-center'>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset/:id" element={<Verifyreset />} />
          <Route path="/quiz/view/:id" element={<ViewQuiz />} />
          <Route path="/quiz/delete/:id" element={<Verifyreset />} />
          {/* {isUserSignedIn && <Route path='/account' element={<Account />} />} */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;