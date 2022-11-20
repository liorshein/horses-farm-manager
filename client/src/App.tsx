import {
    Navigate,
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";
import Dashboard, {
    loader as dashboardLoader,
} from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Horses, {
    loader as horsesLoader,
} from "./pages/Horses/Horses";
import Students, {
    loader as studentsLoader,
} from "./pages/Students/Students";
import PersistLogin from "./components/PersistLogin";
import NoMatch from "./pages/NoMatch/NoMatch";
import Lessons, { loader as lessonsLoader } from "./pages/Lessons/Lessons";
import Schedule from "./pages/Lessons/Schedule";
import StudentsForm from "./pages/Students/StudentsForm";
import HorsesForm from "./pages/Horses/HorsesForm";

const AuthProviderLayout = () => (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
);

const router = createBrowserRouter([
    {
        element: <AuthProviderLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" />,
            },
            {
                path: "/login",
                element: <Login />,
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
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <Dashboard />
                                    </ProtectedRoute>
                                ),
                                loader: dashboardLoader,
                            },
                            {
                                path: "/students",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <Students />
                                    </ProtectedRoute>
                                ),
                                loader: studentsLoader,
                            },
                            {
                                path: "/students/new",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <StudentsForm />
                                    </ProtectedRoute>
                                )
                            },
                            {
                                path: "/students/:student",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <StudentsForm />
                                    </ProtectedRoute>
                                )
                            },
                            {
                                path: "/horses",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <Horses />
                                    </ProtectedRoute>
                                ),
                                loader: horsesLoader,
                            },
                            {
                                path: "/horses/new",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <HorsesForm />
                                    </ProtectedRoute>
                                )
                            },
                            {
                                path: "/horses/:horse",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <HorsesForm />
                                    </ProtectedRoute>
                                )
                            },
                            {
                                path: "/lessons",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <Lessons />
                                    </ProtectedRoute>
                                ),
                                loader: lessonsLoader,
                            },
                            {
                                path: "/lessons/:instructor",
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={["User", "Admin"]}>
                                        <Schedule />
                                    </ProtectedRoute>
                                )
                            },
                        ],
                    },
                ],
            },
            {
                path: "*",
                element: <NoMatch />,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
