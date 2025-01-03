export interface ProcessInstance {
    links: any[]
    id: string
    definitionId: string
    businessKey: string | null
    caseInstanceId: string | null
    ended: boolean
    suspended: boolean
    tenantId: string | null
}
