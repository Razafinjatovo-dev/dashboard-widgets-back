export class CreateWidgetDto {
    service:string //id of the service
    name: string;
    description: string;
    endpoint: string;
    params: object;
}