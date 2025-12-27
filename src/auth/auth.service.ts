import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';



export type RegisterUserDTO = {
  name: string;
  email: string;
  password: string;
};

@Injectable()


export class AuthService {

    constructor (private prisma:PrismaService ,private jwtService: JwtService){}
     
  async  registerUser( payload:RegisterUserDTO){

    const isextisUser=await this.prisma.user.findFirst({where:{email:payload.email}})

    if(isextisUser){
        throw new ConflictException("User already exist in database !")
    }

  const hasPassword=await  bcrypt.hash(payload.password as string,10)

     payload.password=hasPassword



     if (!payload.name || !payload.email || !payload.password){

        throw new BadRequestException("name email and password is required!")
     }

    const result=await this.prisma.user.create({data:payload,select:{email:true,id:true,name:true,role:true,createdAt:true,isActive:true,updatedAt:true}})

        return {
            "success":true,
            "message":"User success fully created",
            "data":result
        }
    }

    async LogingUser(payload:{email:string,password:string}) {


        const isextisUser=await this.prisma.user.findFirst({where:{email:payload.email}})


        if (!isextisUser){

       throw new UnauthorizedException('Invalid email or password');
        }


        console.log(isextisUser)

        const comperPassword=await bcrypt.compare(payload.password,isextisUser.password)

  if (!comperPassword){

     throw new UnauthorizedException('Invalid email or password');
    }


   const payloads ={ email:isextisUser.email,name:isextisUser.name,role:isextisUser.role}



  const accessToken= await  this.jwtService.sign(payloads)

  return accessToken

 
    }

    
}



