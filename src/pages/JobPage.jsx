import { getSingleJob, updateHirinStatus } from '@/api/apiJobs';
import ApplicationCard from '@/components/ApplicationCard';
import ApplyJob from '@/components/ApplyJob';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const JobPage = () => {
  const {isLoaded,user}=useUser();


  const {id}=useParams();

  const {loading:loadingJob,data:job,fn:fnJob}=useFetch(getSingleJob,{job_id:id});
  const {loading:loadingHiringStatus,fn:fnHiringStatus}=useFetch(updateHirinStatus,{job_id:id});

  useEffect(()=>{
    if(isLoaded) fnJob()
  },[isLoaded]);

  const handleStatusChange = (value) =>{
    
    const isOpen = value === 'open';
    console.log(isOpen)
    fnHiringStatus(isOpen).then(()=>fnJob())
  }
  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title} />
      </div>
      <div className='flex justify-between'>
        <div>
          <MapPinIcon />
          {job?.location}
        </div>
        <div className='flex gap-2'>
          <Briefcase /> {job?.application?.length} Application
        </div>
        <div className='flex gap-2'>
          {job?.isOpen? <><DoorOpen />Open</>:<><DoorClosed />Close</>}
        </div>
      </div>
      {loadingHiringStatus && <BarLoader width={'100%'} color='#36d7b7' />}
      {
        job?.recruiter_id === user?.id &&
        <Select onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Hiring Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          
                <SelectItem value='open'>
                  Open
                </SelectItem>
                <SelectItem value='close'>
                  Close
                </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      }
      <h2 className='text-2xl sm:text-3xl font-bold'> About the Job</h2>
      <p className='sm:text-lg'>{job?.description}</p>
      <h2 className='text-2xl sm:text-3xl font-bold'>
        What we are looking for
      </h2>
      <MarkdownEditor.Markdown source={job?.requirement} className='bg-transparent sm:text-lg'/>
      {/* render application  */}
      {job?.recruiter_id !== user?.id && 
      <ApplyJob job={job} user={user} fetchJob={fnJob} applied={job?.application?.find((ap)=>ap.condidate_id===user.id)} />}
    
      {job?.application?.length > 0 && job?.recruiter_id ===user?.id && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl pb-5 font-bold'>Applications</h2>
          {job?.application.map((item,index)=>{
            return <ApplicationCard job={job} application={item} key={index}/>
          })}
        </div>
      )}
    </div>
  )
}

export default JobPage
