
export class AuthDto {
    username: string;
    email: string;
    profilePic: string;

    constructor(user: any) {
        this.username = user.username;
        this.email = user.email;
        this.profilePic = user.profilePic;
    }
}