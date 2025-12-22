
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/DashBoard'
import IpoDetail from './pages/ipoDetail'
import NewIpo from './pages/NewIpo'
import ViewAllIpos from './pages/ViewAll.jsx'

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ipo/:id" element ={<IpoDetail/>} />
          <Route path="/ipo/new" element={<NewIpo />} />
          <Route path ="/ipopage" element={<ViewAllIpos/>}/>
        </Routes>
      </Router>
  )
}

export default App