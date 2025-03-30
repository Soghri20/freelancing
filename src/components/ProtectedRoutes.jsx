import { useUser } from '@clerk/clerk-react';
import { UndoIcon } from 'lucide-react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {isSignedIn,user,isLoaded}=useUser();
    const {pathname}=useLocation();
    const navigate = useNavigate()

    if(isLoaded && !isSignedIn && isSignedIn !==undefined){
        return navigate('/?sign-in=true')
    }
    // check onboarding status 
    if(user !== undefined && !user?.unsafeMetadata?.role && 
        pathname !=='/onboarding'){
            console.log('here')
        return navigate('/onboarding')
    }
    return children;
}

export default ProtectedRoutes
