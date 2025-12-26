import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';


export type RegisterUserDTO = {
  name: string;
  email: string;
  password: string;
};

@Injectable()


export class AuthService {

    constructor (private prisma:PrismaService){}
     
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

    const result=await this.prisma.user.create({data:payload})


        return result
    }

    
}
