
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/DashBoard'
import IpoDetail from './pages/ipoDetail'

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ipo/:id" element ={<IpoDetail/>} />
        </Routes>
      </Router>
  )
}

export default App
