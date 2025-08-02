import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AuthProvider from './ContextAPI/Auth.jsx'
import PathProvider from './ContextAPI/path.context.jsx'

createRoot(document.getElementById('root')).render(
<PathProvider>
<AuthProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</AuthProvider>
</PathProvider>
)
