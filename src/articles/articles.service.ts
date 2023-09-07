import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User,Articles, Prisma } from '@prisma/client'

@Injectable()
export class ArticlesService {

    constructor(private prismaService:PrismaService){
        
    }
    async getAllAticles(){
        return this.prismaService.articles.findMany()
    }

    async createArticle(data: Prisma.ArticlesCreateInput):Promise<Articles>{
        return this.prismaService.articles.create({data})
            
    }
    async updateArticle(id:number,approve:boolean): Promise<Articles> {
        return this.prismaService.articles.update({
        where:{
            id: id
          },
          data:{
            approved:approve
          }
          
        });
      }

    async getApprovedArticles(){
        return this.prismaService.articles.findMany({
            where:{
                approved:true
            }
        }
            
        )
    }
    async getDisApproveArticles(){
        return this.prismaService.articles.findMany({
            where:{
                approved:false
            }
        }
            
        )
    }
    // async getAllArticles(){
    //     return this.prismaService.articles.findMany({
    //         where:{
    //             approved:false  true
    //         }
    //     }
            
    //     )
    // }
    async getArticlesByUser(authorId:number){

        return this.prismaService.articles.findMany({
            where:{
                userId:authorId
            }
        }
            
        )
    }
}
