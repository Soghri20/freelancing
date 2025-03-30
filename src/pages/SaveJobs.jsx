import { getSavedJobs } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

const SaveJobs = () => {
  const {isLoaded}= useUser()
  const {loading,data,fn} = useFetch(getSavedJobs);
  useEffect(()=>{
    if(isLoaded) fn()
  },[isLoaded])
if(!isLoaded || loading) {
  return <BarLoader className='mb-4' width={'100%'} color='green' />
}
  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        Saved Jobs
      </h1>
      {loading ===false &&  (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.length ? (
          data.map((job)=>{
            console.log(job)
            //const saved = job?.saved_job.find((item)=>item.id===user?.id)
            return (
              <JobCard key={job.id} job={job.jobs} savedInit={true} 
              onJobSaved={fn}/>
            )
          })
        ):""}
      </div>
      )}
    </div>
  )
}

export default SaveJobs
