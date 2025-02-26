import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Route here
import './App.css';
import SecurityOverview from './Components/Security/SecurityOverview/SecurityOverview';
import AddSecurity from "./Components/Security/AddSecurity/AddSecurity";
import HomePage from './Components/Pages/HomePage/HomePage';
function App() {
  return (
    <div >
      <React.Fragment>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addsecurity" element={<AddSecurity />} />
        </Routes>
    </React.Fragment>
    </div>
  );
}

export default App;
