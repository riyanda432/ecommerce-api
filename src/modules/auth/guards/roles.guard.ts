import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, UserRole } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If route is public, allow access
    if (isPublic) {
      return true;
    }
    
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    // Ensure user exists and has a role
    if (!user || !user.role) {
      throw new UnauthorizedException('User not authenticated or missing role');
    }
    
    // Check if the user's role is in the required roles
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRequiredRole) {
      throw new UnauthorizedException(`User with role '${user.role}' does not have sufficient permissions`);
    }
    
    return true;
  }
} 