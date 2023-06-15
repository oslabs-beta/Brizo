import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import StructureOverview from './components/StructureOverview';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StructureOverview />} />
    </Routes>
  )
}

export default App