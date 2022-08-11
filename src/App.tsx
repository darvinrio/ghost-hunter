import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';

import { GlobalStyles } from './styles/Global';

import Layout from './components/Layout';
import { Home } from './components/Home'
import { User } from './components/User'
import { Tx } from './components/Tx';
import NoPage from './components/NoPage';

let theme = require('./json/theme.json')
function App() {

  const myTheme: DefaultTheme = theme

  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route index element={<Home />} />
          <Route path='' element={<Layout />}>
            yolo
            {/* <Route path="user/:user" element={<UsersTxs/>} /> */}
            <Route path="user/:user" element={<User />} />
            <Route path="tx/:tx_hash" element={<Tx />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
