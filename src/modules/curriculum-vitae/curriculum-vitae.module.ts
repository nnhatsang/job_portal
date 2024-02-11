import { Module } from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CurriculumVitaeController } from './curriculum-vitae.controller';

@Module({
  controllers: [CurriculumVitaeController],
  providers: [CurriculumVitaeService],
})
export class CurriculumVitaeModule {}
