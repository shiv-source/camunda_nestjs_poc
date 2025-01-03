import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Client, logger } from 'camunda-external-task-client-js'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class UtilsService {
    public readonly camundaBaseURL: string = 'http://camunda-engine:8080/engine-rest'
    public readonly camundaClient: Client
    constructor(private readonly httpService: HttpService) {
        const config = { baseUrl: this.camundaBaseURL, use: logger }
        this.camundaClient = new Client(config)
    }

    async fetchFromCamunda<T = unknown>(endpoint: string, params?: { [key: string]: any }): Promise<T> {
        try {
            const res = await firstValueFrom(this.httpService.get<T>(`${this.camundaBaseURL}${endpoint}`, { params }))
            return res.data
        } catch (error) {
            throw error
        }
    }

    async postToCamunda<T = unknown>(endpoint: string, body: any, isMultipart: boolean = false): Promise<T> {
        try {
            const headers = {
                'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json'
            }

            const res = await firstValueFrom(this.httpService.post<T>(`${this.camundaBaseURL}${endpoint}`, body, { headers }))
            return res.data
        } catch (error) {
            throw error
        }
    }
}
