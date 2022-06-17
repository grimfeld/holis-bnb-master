import React from 'react';
import SearchPage from './pages/Search/Search';
import DisplayLocationPage from './pages/DisplayLocation/DisplayLocation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="locations/" element={<SearchPage />} />
          <Route path="locations/:locationId" element={<DisplayLocationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
