import supabaseClient, { supabaseUrl } from "@/supabase";

export async function applyToJob(token,_,jobData){
    const supabase = await supabaseClient(token);
    const random = Math.floor(Math.random()*90000);
    const filename=`resume-${random}-${jobData.candidate_id}`;
    const {error:storageError} = await supabase.storage.from('resumes').upload(filename,jobData.resume);
    if(storageError){
        console.log('error fetching ',error);
        return null
    }
    const resume =`${supabaseUrl}/storage/v1/object/public/resumes/${filename}`;

    const {data,error}=await supabase.from('application')
    .insert([{
        ...jobData,resume
    }])
    if(error){
        console.log('error fetching ',error);
        return null
    }
    return data

}
export async function updateApplications(token,{job_id},status){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('application')
     .update({status}).eq('job_id',job_id).select()
    if(error || data.length===0){
        console.log('error fetching ',error);
        return null
    }
    return data

}
export async function getApplications(token,{user_id}){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('application')
     .select('*,jobs(*,companies(*))').eq('candidate_id',user_id)
    if(error || data.length===0){
        console.log('error fetching ',error);
        return null
    }
    
    return data

}