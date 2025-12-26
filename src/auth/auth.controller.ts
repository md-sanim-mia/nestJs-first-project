import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {


    authService :AuthService


    constructor( authService :AuthService){

        this.authService=authService
    }

    @Post("register") 
  @HttpCode(HttpStatus.CREATED)
   async register(@Body() payload){
         

    console.log( "check the user ",payload)
        const result=this.authService.registerUser(payload)
        return result
    }


    @Post("login") 
     @HttpCode(HttpStatus.OK)
    async loginUser(@Body() payload){

 if(!payload.email|| !payload.password){
  throw new BadRequestException('Email and password are required');

 }

 const result=await this.authService.LogingUser(payload)



 return{
    "success":true,
     "message":"User login success fully !", 
    "data":result
 }

    }
    
}
