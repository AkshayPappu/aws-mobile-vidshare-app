import { getAuth } from 'firebase/auth';

const auth = getAuth();

export const getUserInfo = () => {
    const user = auth.currentUser;
    console.log(user);
    
    if (user) {
        return {
            email: user.email,
            id: user.uid,
        };
    }
    else {
        return null;
    }
}
