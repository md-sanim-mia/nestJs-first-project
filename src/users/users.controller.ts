import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    usersService:UsersService

    constructor (  usersService:UsersService){

        this.usersService=usersService
    }

    @Get("get/all-users")
    @HttpCode(HttpStatus.OK)
  async GetAllUSers(){

    const result=await this.usersService.GetAllUsers()


    return {
        
         "success":true,
        "message":"successfuly get all users !",
        "data":result
    }

}

}
