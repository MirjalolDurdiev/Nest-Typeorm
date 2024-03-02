//

import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  mixin,
} from '@nestjs/common';

export const AuthorizeGuard = (allowedRoles: string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      console.log('request', request);

      if (!request?.currentUser) {
        throw new UnauthorizedException('Authentication required');
      }

      const userRoles = request.currentUser.roles;

      if (
        Array.isArray(userRoles) &&
        userRoles.length > 0 &&
        allowedRoles.some((role) => userRoles.includes(role))
      ) {
        return true;
      }

      throw new UnauthorizedException('Sorry, you are not authorized');
    }
  }

  const guard = mixin(RolesGuardMixin);
  return guard;
};
