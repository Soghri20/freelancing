import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import { useSession, useUser } from '@clerk/clerk-react';
import { State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { getCompanies } from '@/api/apiCompanies';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MDEditor from '@uiw/react-markdown-editor'
import useFetch from '@/hooks/useFetch';
import { addNewJobs } from '@/api/apiJobs';
import AddCompayDrawer from '@/components/AddCompayDrawer';

const JobForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    company_id: '',
    requirement: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const { isLoaded, user} = useUser();
  const {session}=useSession()
  const navigate = useNavigate();
  const {error,loading:loadingCreateJob,fn,data:jobs}=useFetch(addNewJobs)
  const fetchCompanies = async () => {
    setLoading(true);
    const token = await session.getToken({ template: "supabase" });
    const result = await getCompanies(token);
    setCompanies(result);
    setLoading(false);
  };
  useEffect(() => {
    
    if (isLoaded) fetchCompanies();
  }, [isLoaded]);
  useEffect(()=>{
    if(jobs?.length>0) navigate('/jobs')
  },[loadingCreateJob])

  if (!isLoaded || loading) {
    return <BarLoader className='mb-4' width={'100%'} color='green'/>;
  }

  if (user?.unsafeMetadata?.role !== 'recruiter') {
    return navigate("/jobs");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = 'Ce champ est requis';
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    fn({
      ...formData,
      recruiter_id:user.id,
      isOpen:true 
    })
  };


  return (
    <div className='w-[80%] mx-auto'>
      <h1 className='font-extrabold text-5xl sm:text-7xl text-center pb-8'>Post a Job</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <Input name="title" placeholder="Titre du poste" value={formData.title} onChange={handleChange} />
        {errors.title && <p className="text-red-500">{errors.title}</p>}

        <div className='flex items-center h-full gap-3'>
        <Select className='w-full' value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry('MA').map(({ name }) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.location && <p className="text-red-500">{errors.location}</p>}

        <Select className='w-full' value={formData.company_id} onValueChange={(value) => setFormData({ ...formData, company_id: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <AddCompayDrawer fetchCompanies={fetchCompanies}/>
        </div>
        {errors.company_id && <p className="text-red-500">{errors.company_id}</p>}

        <MarkdownEditor
         height="200px"
         className="bg-black"
          value={formData.requirement}
          onChange={(value) => setFormData({ ...formData, requirement: value })}
        />
        {errors.requirement && <p className="text-red-500">{errors.requirement}</p>}

        <MDEditor
         height="200px"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}
        {loadingCreateJob && <BarLoader width={'100%'} color='green'/>}
        {error && <p className="text-red-500">{error.message}</p>}

        <Button type="submit" variant='blue' size='lg'>Soumettre</Button>
      </form>
    </div>
  );
};

export default JobForm;
