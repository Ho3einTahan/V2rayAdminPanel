import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {


 async canActivate(context: ExecutionContext):Promise<boolean>{
   

  try {
    const result= super.canActivate(context) as boolean; 
    return result; // در غیر این صورت کاربر بازگردانده می‌شود
  } catch (e) {
    console.log('errrrr');
  }

  }

}
