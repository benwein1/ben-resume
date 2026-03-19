import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import './styles/theme.scss'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#146C78' },
    secondary: { main: '#3E8E7E' },
    background: {
      default: '#F3F7F6',
      paper: '#FFFFFF',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
