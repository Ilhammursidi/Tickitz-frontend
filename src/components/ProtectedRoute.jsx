import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireRegistration = () => {
    const { registeredEmail } = useSelector((state) => state.auth);

    if (!registeredEmail) {
        return <Navigate to="/auth/register" replace />;
    }

    return <Outlet />;
};

export const RequireActivationSuccess = () => {
    const { isActivationSuccess } = useSelector((state) => state.auth);

    if (!isActivationSuccess) {
        return <Navigate to="/auth/register/activate" replace />;
    }

    return <Outlet />;
};