    import { PrismaClient } from '@prisma/client';
    import { CreateProductInput, UpdateProductInput } from './product.schema';

    const prisma = new PrismaClient();

    export class ProductService {
    static async create(data: CreateProductInput) {
        return prisma.product.create({data})
    }

    static async update(id: string, data: UpdateProductInput) {
        return prisma.product.update({
        where: { id },
        data,
        });
    }

    static async delete(id: string) {
        return prisma.product.delete({ where: { id } });
    }

    static async findAll() {
        return prisma.product.findMany({
        include: { category: true },
        });
    }

    static async findById(id: string) {
        return prisma.product.findUnique({
        where: { id },
        include: { category: true },
        });
    }
    }
