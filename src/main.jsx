import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './lib/theme.jsx'
import { ContentProvider } from './lib/content.jsx'

// Admin is code-split so the public portfolio never ships the dashboard bundle.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

// Public portfolio at "/", admin dashboard at "/admin/*".
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }} />}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <ContentProvider>
                <App />
              </ContentProvider>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
