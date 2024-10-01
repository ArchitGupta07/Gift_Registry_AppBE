export class AuthDto {
  id: number;
    username: string;
    email: string;
    profilePic: string;
  
    constructor(user: any) {
      this.id = user.id
      this.username = user.username; // Set the correct user fields
      this.email = user.email;
      this.profilePic = user.profilePic;
    }
  }
  