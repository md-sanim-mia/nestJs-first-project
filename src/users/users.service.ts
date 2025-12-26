import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {


    constructor (private readonly prisma:PrismaService){}


    async GetAllUsers (){


        const result=await this.prisma.user.findMany({select:{email:true,id:true,name:true,isActive:true,role:true,createdAt:true,updatedAt:true}})
        
        console.log("check user result",result)
    
        return result

    }
}
