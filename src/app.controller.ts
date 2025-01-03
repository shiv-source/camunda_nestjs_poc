import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('process-list')
    allProcess() {
        return this.appService.getActiveProcesses()
    }

    @Get('deployment-list')
    allDeployments() {
        return this.appService.getCompletedProcesses()
    }

    @Post('deploy')
    deployWorkflow() {
        return this.appService.deployWorkflow('apply_loan')
    }

    @Post('apply-for-loan')
    startProcess() {
        return this.appService.startLoanProcess()
    }
}
