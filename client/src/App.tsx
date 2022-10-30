import { Navigate, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import AuthProvider from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Horses, { loader as horsesLoader, action as horsesAction } from './pages/Horses/Horses'
import Students, { loader as studentsLoader, action as studentsAction } from './pages/Students/Students'
import PersistLogin from './components/PersistLogin'
import NoMatch from './pages/NoMatch/NoMatch'
import Lessons from './pages/Lessons/Lessons'

const AuthProviderLayout = () => (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
)

const router = createBrowserRouter([
    {
        element: <AuthProviderLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                element: <PersistLogin />,
                errorElement: <Login />,
                children: [
                    {
                        path: "/",
                        element: <Layout />,
                        children: [
                            {
                                path: "/dashboard",
                                element: <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Dashboard />
                                </ProtectedRoute>,
                                loader: dashboardLoader
                            },
                            {
                                path: "/students",
                                element: <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Students />
                                </ProtectedRoute>,
                                loader: studentsLoader,
                                action: studentsAction
                            },
                            {
                                path: "/horses",
                                element: <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Horses />
                                </ProtectedRoute>,
                                loader: horsesLoader,
                                action: horsesAction
                            },
                            {
                                path: "/lessons",
                                element: <ProtectedRoute allowedRoles={["User", "Admin"]}>
                                    <Lessons />
                                </ProtectedRoute>,
                            }
                        ]
                    }
                ]
            },
            {
                path: "*",
                element: <NoMatch />
            }
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App
