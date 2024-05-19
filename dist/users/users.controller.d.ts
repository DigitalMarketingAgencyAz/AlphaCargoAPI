import { UsersService } from './users.service';
import { BaseUserReq } from './dto/base-user.dto';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(request: any): Promise<BaseUserReq>;
    updateUser(request: any, updateUserReqDto: UpdateUserReqDto): Promise<UpdateUserResDto>;
}
