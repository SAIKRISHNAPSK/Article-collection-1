import { Controller,Post,Body,Session,UseGuards,Patch,NotFoundException,Param,Get,Query } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ArticlesService } from './articles.service';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('articles')
export class ArticlesController {

    
    constructor(private userService:UsersService,private articlesService:ArticlesService){

    }
    @Get()
    findAllArticles(){
        return  this.articlesService.getAllAticles()
    }
    @Post('create')
    @UseGuards(AuthGuard)
     async createArticle(@Body() body:{title:string,description:string},@Session() session:any){
        const user= await this.userService.findUserById(session.userId)
        console.log(user)
        if ((user.role)==='admin'){
            throw new NotFoundException('You are not authorize to create a article')
        }
        const {title,description}=body
        return this.articlesService.createArticle({
            title,
            description,
            user:{
                connect:{id:user.id}
            }
        })

     }

     @Patch('/:id')
     @UseGuards(AuthGuard)
     async approveArticle(@Param('id') id:string,@Body() body:{approve:boolean},@Session() session:any){
        const user= await this.userService.findUserById(session.userId)
        console.log(user)
        if ((user.role)!=='admin'){
            throw new NotFoundException('You are not authorize to approve the article')
        }
        return this.articlesService.updateArticle(parseInt(id),body.approve
            )
         }
    @Get('approve')
    findApprovedArticles(){
        return this.articlesService.getApprovedArticles()
    }
    @Get('disapprove')
    findDisApproveArticles(){
        return this.articlesService.getDisApproveArticles()
    }
    @Get('user/:userId')
    async findArticleByAuthor(@Param('userId') userId:string){
        console.log(userId)
        return this.articlesService.getArticlesByUser(parseInt(userId))
    }


     


}
