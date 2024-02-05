import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    console.log('entrou no POST');
    
  const {sub, name, email} = await request.json();
  const user = await prisma.user.findUnique(
      {
        where: { sub: sub},
      }
    );
    console.log('user', user);
    
  
  if (!user) {
    const result = await prisma.user.create(
      {
        data: {
          sub,
          name,
          email,
        }
      }
    );
      console.log(result);
      
    return NextResponse.json({"result":"teste"});
  }

    return NextResponse.json({id: user.id});
}
