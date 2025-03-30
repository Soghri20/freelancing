import CreatedApplication from '@/components/CreatedApplication';
import CreatedJobs from '@/components/CreatedJobs';
import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { BarLoader } from 'react-spinners';

const MyJobs = () => {
  const {user,isLoaded} = useUser();

  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color='green' />
  }
console.log(user?.unsafeMetadata?.role)
  return (
    <div>
      <h1 className='font-extrabold text-5xl sm:text-7xl text-center pb-8'>
        {user?.unsafeMetadata?.role ==='candidate' ? 'My Application':'My Jobs'}
      </h1>
      {user?.unsafeMetadata?.role==='candidate'? <CreatedApplication /> : <CreatedJobs />}
    </div>
  )
}

export default MyJobs
