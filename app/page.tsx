import Login from "@/components/Login";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  const { sub, name, email } = session?.user || {};
  
  if (session?.user){
    try{
      
      const res = await fetch(
        `${process.env.BASE_URL}/api/user`,
        {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({sub, name, email})
        }
      );
    } catch (error){
      console.error(error);
    }

    redirect(`/schedule?sub=${sub}`);
  }
    
  return (
    <Login />
  );
}