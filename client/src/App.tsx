import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import NoMatch from './pages/NoMatch'
import AuthProvider from './components/AuthProvider'
import AuthService from './services/auth.service'
import ProtectedRoute from './components/ProtectedRoute'
import Students from './pages/Students'

type Props = {}

const App = (props: Props) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route
                        path="students"
                        element={
                            <ProtectedRoute>
                                <Students />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
