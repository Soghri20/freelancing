import { getApplications } from '@/api/apiApplication'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import ApplicationCard from './ApplicationCard'

const CreatedApplication = () => {
    const {user} = useUser()
    const {loading,data,fn}=useFetch(getApplications,{user_id:user.id});
    useEffect(()=>{
        fn();
    console.log(data)
    },[])
    if(loading){
        return <BarLoader className='mb-4' width={'100%'} color='green'/>
    }
    console.log('here')
    
  return (
    <div>
       {data?.map((item,index)=>{
            return <ApplicationCard job={item.jobs} isCandidate={true} application={item} key={index}/>
          })}
    </div>
  )
}

export default CreatedApplication
