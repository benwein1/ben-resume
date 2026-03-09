import { Navigate, Route, Routes } from 'react-router-dom'
import { CandidatesPage } from './pages/CandidatesPage'
import { CandidateDetailsPage } from './pages/CandidateDetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CandidatesPage />} />
      <Route path="/candidates/:candidateId" element={<CandidateDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
