import { Controller,Post,Body,Session,Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel, Articles as ArticlesModel } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService,private authService:AuthService){

    }
    @Get()
    findAllUsers(){
        return this.userService.getAllUsers()
    }
    @Get('/who')
    whoImI(@Session() session:any){
        return this.userService.findUserById(session.userId)}

    @Post('/signout')
    signout(@Session() session:any){
        session.userId=null
    }

    @Post('/create')
    createNewUser(@Body( )userData:{name:string,email:string,password:string}):Promise<UserModel>{
        return this.authService.signup(userData.name,userData.email,userData.password)
    }
    @Post('/signin')
     async verifyUser(@Body( )userData:{email:string,password:string},@Session() session:any):Promise<UserModel>{
        const user= await this.authService.signin(userData.email,userData.password)
        session.userId=user.id
        return user

    }
    @Post('/create-admin')
    createAdmin(@Body( )userData:{name:string,email:string,password:string}):Promise<UserModel>{
        return this.authService.signupAdmin(userData.name,userData.email,userData.password)
    }
    
}
