import { useState } from 'react'
import './App.css'
import TextEditor from './TextEditor'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Navigate to={`/documents/${uuidV4()}`} />}>
          </Route>
          <Route path="/documents/:id" element={<TextEditor />}>
          </Route>
        </Routes>
      </Router>
    </div >
  )
}

export default App
