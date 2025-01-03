import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UtilsService } from './utils.service'

@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, UtilsService]
})
export class AppModule {}
