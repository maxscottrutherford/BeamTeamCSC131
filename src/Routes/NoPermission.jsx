import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Context = createContext();

export function AuthContext({ children }) {
    const auth = getAuth();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(false);
            if (currentUser) setUser(currentUser);
            else { setUser(null); }
        });
        return () => {
            if (unsubscribe) unsubscribe();
        }
    }, []);

    const isAdmin = () => {
        // Check if the word 'admin' is in the user's username
        return user && user.displayName && user.displayName.toLowerCase().includes('admin');
    };

    const getOrganization = () => {
        // Get the organization from the user's login email
        return user && user.email ? user.email.split('@')[1] : null;
    };

    const values = {
        user: user,
        isAdmin: isAdmin,
        getOrganization: getOrganization,
    };

    return (
        <Context.Provider value={values}>
            {!loading && children}
        </Context.Provider>
    );
}
