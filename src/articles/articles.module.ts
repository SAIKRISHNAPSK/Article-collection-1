import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ArticlesController],
  providers: [UsersService,ArticlesService,PrismaService]
})
export class ArticlesModule {}
