import React, { useEffect, useState } from 'react';
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
import useFetch from '@/hooks/useFetch';
import { addNewCompanies } from '@/api/apiCompanies';

const AddCompanyDrawer = ({ fetchCompanies }) => {
    const { loading, fn, error,data } = useFetch(addNewCompanies);
    const [companyName, setCompanyName] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
       
        if (!companyName || !file) return;
        
        const formData = new FormData();
        formData.append("name", companyName);
        formData.append("file", file);
        
        await fn({
            name:companyName,
            logo_url:file
        });
        fetchCompanies();
    };
    useEffect(()=>{
        if(data?.length >0) fetchCompanies()
    },[loading])

    return (
        <Drawer>
            <DrawerTrigger>
                <Button type='button' size='lg'  variant='secondary'>
                    Add Company
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add a new company</DrawerTitle>
                    <DrawerDescription>Provide the details below.</DrawerDescription>
                </DrawerHeader>
                <form className='flex flex-col gap-2 p-4'>
                    <Input
                        placeholder='Company name'
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                    <Input
                        type='file'
                        className='file:text-gray-500'
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                    <Button type='button' onClick={handleSubmit} className='w-40' disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </Button>
                </form>
                {error && <p className='text-red-500 p-4'>{error}</p>}
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="secondary" type='button'>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default AddCompanyDrawer;
