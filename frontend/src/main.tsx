import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import { queryClient } from './queryClient'
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
