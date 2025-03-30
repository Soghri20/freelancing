import React, { useState } from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import useFetch from '@/hooks/useFetch';
import { applyToJob } from '@/api/apiApplication';
import { BarLoader } from 'react-spinners';

const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        education: '',
        resume: null,
    });
    const [errors, setErrors] = useState({});
    const { loading, error, fn } = useFetch(applyToJob);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name || isNaN(formData.name) || formData.name < 0) {
            newErrors.name = 'name must be a positive number';
        }
        if (!formData.skills) {
            newErrors.skills = 'Skills are required';
        }
        if (!formData.education) {
            newErrors.education = 'Education level is required';
        }
        if (!formData.resume || (formData.resume.type !== 'application/pdf' && formData.resume.type !== 'application/msword')) {
            newErrors.resume = 'Only PDF or Word documents are allowed';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Submitting form:', formData);
            // Call API function here
            delete formData.name
            fn({
              ...formData,
              job_id:job.id,
              candidate_id:user.id,
              name:user.fullname,
              status:'applied',
            
            }).then(()=>{
              fetchJob();
              setFormData({
                name: '',
                skills: '',
                resume: null,
              })
            })
        }
    };

    return (
        <Drawer open={applied ? false : undefined}>
            <DrawerTrigger asChild>
                <Button size='lg' variant={job?.isOpen && !applied ? 'blue' : 'destructive'}
                    disabled={!job?.isOpen || applied}>
                    {job?.isOpen ? (applied ? 'Applied' : 'Apply') : 'Hiring Closed'}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Apply for {job?.title} at {job?.company?.name}?</DrawerTitle>
                    <DrawerDescription>Please fill in the form below.</DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmit} className='p-4 pb-0 flex flex-col gap-2'>
                    {errors.name && <p className='text-red-500 text-sm p-0 m-0'>{errors.name}</p>}
                    <Input type='number' name='name' placeholder='Years of name'
                        className='flex-1' value={formData.name} onChange={handleChange} />

                    {errors.skills && <p className='text-red-500 text-sm'>{errors.skills}</p>}
                    <Input type='text' name='skills' placeholder='Skills (Comma Separated)'
                        className='flex-1' value={formData.skills} onChange={handleChange} />

                    {errors.education && <p className='text-red-500 text-sm'>{errors.education}</p>}
                    <RadioGroup 
    value={formData.education} 
    onValueChange={(value) => setFormData({ ...formData, education: value })}
>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="Intermediate" id="intermediate" />
        <Label htmlFor="intermediate">Intermediate</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="Graduate" id="graduate" />
        <Label htmlFor="graduate">Graduate</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="Post Graduate" id="post-graduate" />
        <Label htmlFor="post-graduate">Post Graduate</Label>
    </div>
</RadioGroup>


                    {errors.resume && <p className='text-red-500 text-sm'>{errors.resume}</p>}
                    {error && <p className='text-red-500 text-sm'>{error?.message}</p>}
                    {loading && <BarLoader width={'100%'} color='#36d7d7' />}
                    <Input type='file' accept='.pdf, .doc, .docx' name='resume' className='flex-1 file:text-gray-500' onChange={handleFileChange} />

                    <Button type='submit' variant='blue' size='lg'>Submit</Button>
                </form>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default ApplyJob;
