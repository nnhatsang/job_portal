import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './modules/city/city.module';
import { CompanyModule } from './modules/company/company.module';
import { JobModule } from './modules/job/job.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { ApplicationModule } from './modules/application/application.module';
import { CurriculumVitaeModule } from './modules/curriculum-vitae/curriculum-vitae.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CityModule, CompanyModule, JobModule, UserModule, AuthModule, CommentModule, ApplicationModule, CurriculumVitaeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

