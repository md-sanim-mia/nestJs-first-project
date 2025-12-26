import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {


    authService :AuthService


    constructor( authService :AuthService){

        this.authService=authService
    }

    @Post("register") 

   async register(@Body() payload){
         

    console.log( "check the user ",payload)
        const result=this.authService.registerUser(payload)
        return result
    }
    
}
