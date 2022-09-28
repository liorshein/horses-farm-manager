import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import NoMatch from './pages/NoMatch/NoMatch'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Students from './pages/Students/Students'
import Horses from './pages/Horses/Horses'
import Lessons from './pages/Lessons/Lessons'
import "./general.scss"

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={
                        <ProtectedRoute allowedRoles={["User"]}>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route
                        path="students"
                        element={
                            <ProtectedRoute allowedRoles={["User"]}>
                                <Students />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="horses" element={
                        <ProtectedRoute allowedRoles={["User"]}>
                            <Horses />
                        </ProtectedRoute>
                    } />
                    <Route path="lessons" element={
                        <ProtectedRoute allowedRoles={["User"]}>
                            <Lessons />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
