import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const SCOPES_KEY = 'scopes';
export const Scopes = (...scopes: string[]) => SetMetadata(SCOPES_KEY, scopes);

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredScopes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { scopes?: string[] } | undefined;
    const scopes = new Set(user?.scopes ?? []);
    const hasAll = requiredScopes.every((scope) => scopes.has(scope));

    if (!hasAll) {
      throw new ForbiddenException({ code: 'INSUFFICIENT_SCOPE', requiredScopes });
    }

    return true;
  }
}
