import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import Facilities from './components/facilities/facilities';
import FacilityForm from './components/facility-form/facility-form';
import TopBar from './components/top-bar/top-bar'

function App() {
  return (
    <>
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facility-form/:facilityId?" element={<FacilityForm />} />
        <Route path="/locations" element={<div>Locations Page</div>} />
        <Route path="/players" element={<div>Players Page</div>} />
        <Route path="/access-management" element={<div>Access Management Page</div>} />
      </Routes>
    </BrowserRouter>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
