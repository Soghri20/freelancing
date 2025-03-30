import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BarChart, Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import  { deleteJobs, getJobs, saveJobs }  from '@/api/apiJobs'
import { BarLoader } from 'react-spinners'
const JobCard = ({job,isMyJob=false,savedInit,onJobSaved}) => {
  const [saved, setSaved] = useState(savedInit);
  const {session}=useSession()
  const { user } = useUser();
  const [save,setSave]=useState([]);
  const {loading,fn,error}=useFetch(deleteJobs,{job_id:job.id})
  
 console.log(job)
 const handleDeleteJob = async () =>{
  await fn();
  onJobSaved()
 }

const handleSaveJob = async () => {
  const saveData = { user_id: user.id, job_id: job.id };
  const token = await session.getToken({ template: "supabase" });

  if(!saved){
  setSaved(true)
  const result = await saveJobs(token, { alreadySaved: false}, saveData );
  }else{
    setSaved(false)
    const result = await saveJobs(token, { alreadySaved: true}, saveData );

  }
  if(onJobSaved) onJobSaved()

  

};



  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle className='flex align-items justify-between'>
          {job.title}
        {isMyJob && (
          <Trash2Icon fill='red' onClick={handleDeleteJob} size={18} className='text-red-300 cursor-pointer' />
        )}
        {loading && (
          <BarLoader width={'100%'} className='mb-4' />
        )}
        </CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4 flex-1'}>
        <div className='flex justify-between '>
          {job.company && <img src={job.company.logo_url} className='h-6' />}
          <div className='flex items-center  gap-2'>
            <MapPinIcon siz={13} /> {job.location}
          </div>
        </div>
        <hr className='my-3' />
        {job.description}
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Link to={`/job/${job.id}`}className='flex-1'>
          <Button variant='secondary' className='w-full'>
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
          
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
       
      </CardFooter>
    </Card>

  )
}

export default JobCard
