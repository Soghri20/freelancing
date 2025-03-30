import supabaseClient, { supabaseUrl } from "@/supabase";

export async function getCompanies(token){
    const supabase = await supabaseClient(token);

    const {data,error}=await supabase.from('companies')
    .select('*')
    if(error){
        console.log('error fetching ',error);
        return null
    }
    return data

}
export async function addNewCompanies(token,_,companyData){
    const supabase = await supabaseClient(token);
        const random = Math.floor(Math.random()*90000);
        const filename=`comapny-logo-${random}-${companyData.name}`;
        const {error:storageError} = await supabase.storage.from('comapny-log')
        .upload(filename,companyData.logo_url);
        if(storageError){
            console.log('error fetching ',error);
            return null}
        const logo_url=`${supabaseUrl}/storage/v1/object/public/comapny-log/${filename}`;
    
        const {data,error}=await supabase.from('companies')
        .insert([{
            name:companyData.name,
            logo_url
        }])
        if(error){
            console.log('error Submiting ',error);
            return null
        }
        return data
    
}