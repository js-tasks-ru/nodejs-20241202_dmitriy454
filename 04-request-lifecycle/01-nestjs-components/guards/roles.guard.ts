import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    if (req.headers['x-role'] !== 'admin') {
      throw new ForbiddenException('Доступ запрещён: требуется роль admin')
    }

    return true;
  }
}
