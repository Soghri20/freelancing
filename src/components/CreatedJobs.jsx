import { getMyJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import JobCard from './JobCard';

const CreatedJobs = () => {
    const {user} = useUser();
    const {loading,data,fn}= useFetch(getMyJobs,{recruiter_id:user.id});
    useEffect(()=>{
        fn();
        console.log(data)
    },[])
    if(loading){
        return <BarLoader className='mb-4' width={'100%'} color='green'/>
    }
  return (
    <div>
      {loading=== false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.length ? (
          data.map((job)=>{
            console.log(job)
            //const saved = job?.saved_job.find((item)=>item.id===user?.id)
            return (
              <JobCard key={job.id} job={job}  onJobSaved={fn} isMyJob={true}/>
            )
          })
        ):<p>No Job was founded</p>}
      </div>
      )}
    </div>
  )
}

export default CreatedJobs
