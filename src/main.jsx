import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Routes/Layout';
import DetailView from './Routes/DetailView';
import NotFound from './Routes/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true}  path="/" element={<App />} />
        <Route index={false} path="/coinDetails/:symbol" element={<DetailView />} />
        <Route
          path="*"
          element={ <NotFound /> }
          />
      </Route>

    </Routes>
  </BrowserRouter>
)
