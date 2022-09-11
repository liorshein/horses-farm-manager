import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import NoMatch from './pages/NoMatch/NoMatch'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Students from './pages/Students/Students'
import Horses from './pages/Horses/Horses'
import Lessons from './pages/Lessons/Lessons'
import "./general.scss"

type Props = {}

const App = (props: Props) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
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
                    <Route path="horses" element={
                        <ProtectedRoute>
                            <Horses />
                        </ProtectedRoute>
                    } />
                    <Route path="lessons" element={
                        <ProtectedRoute>
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
