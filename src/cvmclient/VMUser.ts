/* eslint-disable @typescript-eslint/no-unused-expressions */

export enum Permissions {
    Guest = 0,
    Moderator = 3,
    Administrator = 2
}

export type UserOptions = {
    Name: string;
    Permission: Permissions;
}

/**
 * Класс пользлователя CollabVM
 */
export class VMUser {
    Name: string;
    Permission: Permissions;

    constructor(options: UserOptions) {
        this.Name = options.Name,
        this.Permission = options.Permission
    }
}