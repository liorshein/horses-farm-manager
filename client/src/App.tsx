import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import NoMatch from './pages/NoMatch/NoMatch'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
// import Students from './pages/Students/Students'
// import Horses from './pages/Horses/Horses'
// import Lessons from './pages/Lessons/Lessons'
// import PersistLogin from './components/PersistLogin'
import "./general.scss"
import Layout from './components/Layout'
import Horses from './pages/Horses/Horses'
import Lessons from './pages/Lessons/Lessons'
import Students from './pages/Students/Students'
import PersistLogin from './components/PersistLogin'

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path='/login' element={<Login />}></Route>
                    <Route element={<PersistLogin />}>
                        <Route path='/' element={<Layout />}>
                            <Route path='/dashboard' element={
                                <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }></Route>
                            <Route path='/students' element={
                                <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Students />
                                </ProtectedRoute>
                            }></Route>
                            <Route path='/horses' element={
                                <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Horses />
                                </ProtectedRoute>
                            }></Route>
                            <Route path='/lessons' element={
                                <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Lessons />
                                </ProtectedRoute>
                            }></Route>

                        </Route>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
