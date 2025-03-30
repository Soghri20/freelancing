import { useSession } from "@clerk/clerk-react"
import { useState } from "react";

const useFetch = (cb,options) => {
    const {session}=useSession();
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
 
    const fn = async (...args)=>{
        console.log(options)
        
        setLoading(true);
        setError(null);
        try{
            const supabaseAccessToken =  await session.getToken({
                template:'supabase'
              })
          const response= await cb(supabaseAccessToken,options,...args);
          setData(response);
          setError(null)
            
        }catch(error){
            setError(error)
        }finally{
            setLoading(false);
        }
    }

  return {fn,data,loading,error,session}
}

export default useFetch
