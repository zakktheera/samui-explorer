import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import {PlaceDetails} from "./pages/PlaceDetails"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/samui-explorer">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/places/:placeId" element={<PlaceDetails/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
