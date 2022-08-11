import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { User } from './components/User'
import { Tx } from './components/Tx';
import NoPage from './components/NoPage';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='' element={<Layout />}> */}
          yolo
          <Route index element={<Layout />} />
          {/* <Route path="user/:user" element={<UsersTxs/>} /> */}
          <Route path="user/:user" element={<User/>} />
          <Route path="tx/:tx_hash" element={<Tx/>} />
          <Route path="*" element={<NoPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
