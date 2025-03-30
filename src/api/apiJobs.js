import supabaseClient from "@/supabase";

export async function getJobs(token,{location,company_id,searchQuery}){
    const supabase = await supabaseClient(token);
    let query = supabase.from('jobs').select("*,company:companies(name,logo_url),saved_job(*)");

    if(location){
        query = supabase.from('jobs').select("*,company:companies(name,logo_url),saved_job(*)").eq('location',location)
    }
    if(company_id){
        console.log(company_id)
        query = supabase.from('jobs').select("*,company:companies(name,logo_url),saved_job(*)").eq('company_id',company_id)
    }
    if(searchQuery){
        query = supabase.from('jobs').select("*,company:companies(name,logo_url),saved_job(*)")
        .ilike('title',`%${searchQuery}`)
    }

    const {data,error} = await query;


    if(error){
        console.error(error.message);
        return null
    }
    return data;

}
export async function saveJobs(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        console.log("Job already saved, removing it...");

        const { data, error } = await supabase
            .from("saved_job")
            .delete()
            .eq("job_id", saveData.job_id)
            .select();

        if (error) {
            console.error("Error deleting job:", error.message);
            return null;
        }

        console.log("Job removed successfully:", data);
        return data;
    } else {
        console.log("Saving new job...");

        const { data, error } = await supabase
            .from("saved_job")
            .insert([saveData]) // ✅ Removed .eq() here
            .select(); 

        if (error) {
            console.error("Error saving job:", error.message);
            return null;
        }

        console.log("Job saved successfully:", data);
        return data;
    }
    
}

export async function getSingleJob(token,{job_id}){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('jobs')
    .select('*,company:companies(name,logo_url),application(*)').eq('id',job_id).single()
    if(error){
        console.log('error fetching ',error);
        return null
    }
    return data

}
export async function updateHirinStatus(token,{job_id},isOpen){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('jobs')
    .update({isOpen}).eq('id',job_id).select()
    
    if(error){
        console.log('error fetching ',error);
        return null
    }
    console.log(data)
    return data

}
export async function addNewJobs(token,_,jobData){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('jobs')
    .insert([jobData]).select()
    
    if(error){
        console.log('error Creating fetching ',error);
        return null
    }
    console.log(data)
    return data

}

export async function getSavedJobs(token){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('saved_job')
    .select("*,jobs(*,companies(*))")
    
    if(error){
        console.log('error Creating fetching ',error);
        return null
    }
    console.log(data)
    return data

}


export async function getMyJobs(token,{recruiter_id}){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('jobs')
    .select("*,company:companies(*)").eq('recruiter_id',recruiter_id)
    
    if(error){
        console.log('error Creating fetching ',error);
        return null
    }
    console.log(data)
    return data
}
export async function deleteJobs(token,{job_id}){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('jobs')
    .delete().eq('id',job_id).select()
    
    if(error){
        console.log('error Creating fetching ',error);
        return null
    }
    console.log(data)
    return data
}





