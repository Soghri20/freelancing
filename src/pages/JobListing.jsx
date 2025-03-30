import { getCompanies } from '@/api/apiCompanies'
import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { useAuth, useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city'

const JobListing = () => {
  const [searchQuery , setSearchQuery]=useState('');
  const [company_id , setCompany_id]=useState('')
  const [location , setLocation]=useState('')

  const [loadin,setLoadin]=useState(false);
  const [data,setData]=useState([])
  const {isLoaded}=useUser()
  const {fn:fnJobs,data:dataJobs,loading:loadingJobs,session}=useFetch(getJobs,{location,company_id,searchQuery});
  const {fn:fnCompanies,data:dataCompanies,loading}=useFetch(getCompanies);

  useEffect(()=>{
    if (session) fnJobs()
  },[session,searchQuery,company_id,location]);

  useEffect(()=>{
 const companies = async () =>{
  setLoadin(true)
  const token = await session.getToken({ template: "supabase" });
  const result = await getCompanies(token);
  setData(result);
  setLoadin(false)

}
    if(isLoaded) companies();
   
  },[isLoaded]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target)
    const query = formData.get('search-query');
    if(query) setSearchQuery(query)
  }

  const clearFilter = () =>{
    setCompany_id('');
    setLocation('');
    setSearchQuery('')
  }
  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color="#36d7d7" />
  }
  return (
    <div>
      <h1 className='font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1>

     {/* add filters here */}

     <form onSubmit={handleSubmit} className='flex w-full gap-2 items-center h-12 mb-3 '>
      <Input type='text' placeholder='Search Jobs ...' 
      name='search-query' className='h-full flex-1 px-4 text-md ' />
      <Button type='submit' className='h-full sm:w-28' variant='blue'>
        Search
      </Button>
     </form>
     <div className='flex items-center flex-col sm:flex-row gap-2'>
     <Select className='w-full' value={location} onValueChange={(value)=>setLocation(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry('MA').map(({name})=>{
            return (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            )
          })}
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(({name,id})=>{
            console.log(name)
            return (
              <SelectItem key={name} value={id}>
                {name}
              </SelectItem>
            )
          })}
         
          
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button  onClick={clearFilter} variant='destructive' className='w-full sm:w-1/4'>
     Clear Filter
    </Button>
     </div>
      {loadingJobs && (
        <BarLoader className='mb-4' width={'100%'} color="#36d7d7" />
      )}
      {loadingJobs ===false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {dataJobs?.length ? (
            dataJobs.map((job)=>{
              console.log(job)
              //const saved = job?.saved_job.find((item)=>item.id===user?.id)
              return (
                <JobCard key={job.id} job={job} savedInit={job?.saved_job?.length > 0} />
              )
            })
          ):""}
        </div>
      )}
    </div>
  )
}

export default JobListing
