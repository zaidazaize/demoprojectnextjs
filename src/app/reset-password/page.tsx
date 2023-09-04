// redirect to get-email-link
"use client"
import { useRouter } from "next/navigation";
import { useEffect} from "react";

 export default function Page() {
     const router = useRouter();

     useEffect(() => {
        router.push("/reset-password/get-email-link");
        }, [router]);

     return(
         <div> 
                <h1 className="animate-pulse">Redirecting </h1>
         </div>
     );
}