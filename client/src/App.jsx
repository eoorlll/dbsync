import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './assets/scss/App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/>  } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
