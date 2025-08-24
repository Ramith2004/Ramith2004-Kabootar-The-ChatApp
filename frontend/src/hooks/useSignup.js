import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser } = useAuthContext();

    const signup = async ({ fullName, email, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, email, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            console.log('Sending data:', { fullName, email, password, confirmPassword, gender });
            
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password, confirmPassword, gender }),
            });

            const data = await res.json();
            console.log('Response data:', data);
            
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

function handleInputErrors({ fullName, email, password, confirmPassword, gender }) {
    if (!fullName || !email || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

export default useSignup;