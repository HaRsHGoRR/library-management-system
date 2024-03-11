import { useState } from 'react';

export const useAuthState = () => {
    const [isBorrowerLoggedIn, setIsBorrowerLoggedIn] = useState(false);
    const [isUserAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

    return { isBorrowerLoggedIn, setIsBorrowerLoggedIn, isUserAdminLoggedIn, setIsAdminLoggedIn };
};
