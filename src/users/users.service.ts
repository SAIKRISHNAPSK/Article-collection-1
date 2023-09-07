import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client'
@Injectable()
export class UsersService {
    constructor(private prismaService:PrismaService){
        
    }
    async getAllUsers(){
      return this.prismaService.user.findMany()
    }

    async createUser(data: Prisma.UserCreateInput):Promise<User>{
        return this.prismaService.user.create({data})
            

    }
    async findUserById(
        id:number
      ): Promise<User | null> {
        if (!id){
            return null
        }
        return this.prismaService.user.findUnique({
          where: {id},
        })
      }

    async findUser(
        email:string
      ): Promise<User | null> {
        return this.prismaService.user.findUnique({
          where: {email},
        })
      }
}
