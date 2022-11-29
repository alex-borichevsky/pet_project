import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.model";
import { CreateUserParams } from "../utils/types";
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }
  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDetails: CreateUserParams) {
    const user = await this.userService.getUserByEmail(userDetails.email);
    const passwordEquals = await bcrypt.compare(userDetails.password, user.password);
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: "Некорректный email или пароль"})
  }

  public async login(userParams: CreateUserParams) {
    const user = await this.validateUser(userParams);
    return this.generateToken(user);
  }

  public async registration(userParams: CreateUserParams) {
    const candidate = await this.userService.getUserByEmail(userParams.email);
    if (candidate) {
      throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userParams.password, 5);
    const user = await this.userService.createUser({...userParams, password: hashPassword});
    return this.generateToken(user);
  }
}
