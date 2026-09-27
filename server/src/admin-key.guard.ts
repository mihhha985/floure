import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class AdminKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected = process.env.ADMIN_API_KEY;
    const actual = context.switchToHttp().getRequest().headers['x-admin-key'];
    if (typeof expected !== 'string' || expected.length < 32 || typeof actual !== 'string') {
      throw new UnauthorizedException();
    }
    const left = Buffer.from(expected);
    const right = Buffer.from(actual);
    if (left.length !== right.length || !timingSafeEqual(left, right)) throw new UnauthorizedException();
    return true;
  }
}
