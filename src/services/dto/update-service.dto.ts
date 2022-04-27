export class UpdateServiceDto {
    name: string;
    widgets: object; //TODO should we put this key as optional in order to use patch request i.o put? i.e "widgets?:object"
}