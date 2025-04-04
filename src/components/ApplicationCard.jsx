import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import useFetch from '@/hooks/useFetch'
import { updateApplications } from '@/api/apiApplication'
import { BarLoader } from 'react-spinners'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const ApplicationCard = ({job,application,isCandidate=false}) => {

    const {loading,data,fn}=useFetch(updateApplications,{job_id:application.job_id});


    const handleDownload = () =>{
        const link = document.createElement('a');
        link.href=application?.resume;
        link.target = '_blank';
        link.click()
    }
    const handleStatus = (status) =>{
        fn(status)
    }
  return (
    <Card>
     {loading && <BarLoader width={"100%"} color='green' />}
        <CardHeader>
            <CardTitle className='flex justify-between capitalize font-bold'>
                {isCandidate 
                ? `${job?.title} at ${job?.company?.name}`
                : application?.name}
                <Download size={18} 
                className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
                onClick={handleDownload}
               />
            </CardTitle>
        </CardHeader>
        <CardContent className='flex gap-4 flex-2 flex-col'>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex gap-2 items-center'>
                   <School size={15}/> {application?.education} 
                </div>
                <div className='flex gap-2 items-center'>
                   <Boxes size={15}/> Skills: {application?.skills} 
                </div>
                <div className='flex gap-2 items-center'>
                   <BriefcaseBusiness size={15}/>  {application?.name} years of experience
                </div>
            </div>
            <hr />
        </CardContent>
        <CardFooter className='flex justify-between'>
            <span>{new Date(application?.created_at).toLocaleString()}</span>
            {isCandidate ? (
                <span className='capitalize font-bold'>Status : {application?.status}</span>
            ):(
                <Select defaultValue={application.status} onValueChange={handleStatus}>
                  <SelectTrigger className="w-52">
                 <SelectValue placeholder="Hiring Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          
                <SelectItem value='applied'>Applied</SelectItem>
                <SelectItem value='interviewing'>Interviewing</SelectItem>
                <SelectItem value='hired'>Hired</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
                
                
          </SelectGroup>
        </SelectContent>
      </Select>
            )}
        </CardFooter>
    </Card>
  )
}

export default ApplicationCard
