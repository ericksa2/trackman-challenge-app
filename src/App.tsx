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
    </>
  )
}

export default App
