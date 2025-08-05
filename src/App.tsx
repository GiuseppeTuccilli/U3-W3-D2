
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home'
import Top from './Components/Top'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './Components/Details'


function App() {
  

  return (
   <BrowserRouter>
   
    <Routes>
      <Route path='/' element={<> <Top/><Home/></>}/>
     <Route path='/details/:id' element={<Details/>} />     
     
     </Routes>
     </BrowserRouter>
    
  )
}

export default App
