import { createContext, useState, useEffect } from 'react';
import { signIn } from '../services/usersApi'; 
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000; 
                    
                    if (decoded.exp < currentTime) {
                        logout(); 
                    } else {
                        setUser({ id: decoded.userId }); 
                    }
                } catch (error) {
                    console.error("Invalid token", error);
                    logout(); 
                }
            }
        };

        checkToken();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await signIn(username, password); 
            localStorage.setItem('token', res.token);
            setUser(jwtDecode(res.token));
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate("/"); 
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
