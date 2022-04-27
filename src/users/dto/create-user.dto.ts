export class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly widgetsList: object;
    readonly roles: object;
}