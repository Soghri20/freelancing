import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {BarLoader} from 'react-spinners'

const Onboarding = () => {
  const {user,isLoaded}=useUser();
  const navigate = useNavigate()

  const handleRoleSelction = async (role) => {
    try {
      await user.update({ unsafeMetadata: { role } });
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{
    if(user?.unsafeMetadata?.role){
      navigate(
        user.unsafeMetadata === 'recruiter'?'/post-job':'/jobs'
      )
    }
  },[user])
  
  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color="#36d7d7" />
  }

  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h1 className='font-extrabold text-7xl sm:text-8xl tracking-tighter'>I am a ...</h1>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md px-40'>
        <Button variant="blue" className='h-36  text-2xl' onClick={()=>handleRoleSelction('candidate')}>
          Candidate
        </Button>
        <Button variant="default" className='h-36 text-2xl' onClick={()=>handleRoleSelction('recruiter')}>
          Recruiter
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
