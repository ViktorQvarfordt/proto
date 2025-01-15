import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { CSSProp } from 'styled-components'
import { asNotNullish } from '../../shared/src/shared.js'
import { App } from './app.js'
import { BrowserRouter, Routes, Route } from 'react-router'

declare module 'react' {
  interface Attributes {
    css?: CSSProp | undefined
  }
}

createRoot(asNotNullish(document.getElementById('root'))).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/test' element={<div>Test</div>} />
        <Route path='*' element={<div>404 - Page not found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
