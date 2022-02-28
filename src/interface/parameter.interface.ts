import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export interface IParamContext {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  req: Request;
  res: Response;
}
