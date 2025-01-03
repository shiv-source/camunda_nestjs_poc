export interface Deployment {
    links: Array<any>
    id: string
    name: string | null
    source: string
    deploymentTime: string
    tenantId: string | null
}
