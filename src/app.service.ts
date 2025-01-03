import { Injectable, Logger } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { Deployment } from './interfaces/deployment.interface'
import { ProcessInstance } from './interfaces/processInstance.interface'
import { UtilsService } from './utils.service'

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name)

    constructor(private readonly utilsService: UtilsService) {
        this.subscribeToEmailTopic()
    }

    async getActiveProcesses() {
        return this.utilsService.fetchFromCamunda<ProcessInstance[]>('/process-instance')
    }

    async getDeployments() {
        return this.utilsService.fetchFromCamunda<Deployment[]>('/deployment')
    }

    async getCompletedProcesses() {
        return this.utilsService.fetchFromCamunda('/history/process-instance')
    }

    async deployWorkflow(workflowName: string) {
        try {
            const bpmnFilePath = path.resolve(__dirname, '../workflows', `${workflowName}.bpmn`)
            const bpmnFile = await fs.readFileSync(bpmnFilePath)
            const blob = new Blob([bpmnFile], { type: 'application/xml' })
            const formData = new FormData()
            formData.append('deployment-name', `${workflowName}`)
            formData.append('*', blob, `${workflowName}.bpmn`)
            return await this.utilsService.postToCamunda('/deployment/create', formData, true)
        } catch (err) {
            throw err
        }
    }

    async startProcess(processKey: string, variables: { [key: string]: any } = {}) {
        return await this.utilsService.postToCamunda(`/process-definition/key/${processKey}/start`, variables)
    }

    async startLoanProcess() {
        const body = {
            variables: {
                firstName: {
                    value: 'shiv',
                    type: 'String'
                },
                lastName: {
                    value: 'kumar',
                    type: 'String'
                },
                email: {
                    value: 'hello@shivkumar.me',
                    type: 'String'
                }
            }
        }

        return this.startProcess('loan_process', body)
    }

    subscribeToEmailTopic() {
        this.utilsService.camundaClient.subscribe('send_email_to_user', async ({ task, taskService }) => {
            //Once form submitted we are going to send the email
            const allVariables = task.variables.getAll()
            this.logger.log('Form Data Received: ============>', JSON.stringify(allVariables))
            await taskService.complete(task)
        })
    }
}
