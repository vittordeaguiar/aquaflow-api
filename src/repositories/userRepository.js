import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
    create = async (entity) => prisma.user.create({ data: entity });

    update = async (entity) => prisma.user.update({ where: { id: entity.id }, data: entity });

    getByEmail = async (email) => prisma.user.findUnique({ where: { email } });

    findById = async (id) => prisma.user.findUnique({ where: { id } });

    getAllClients = async () => {
        return await prisma.user.findMany({
            where: { role: 'USER' },
            select: {
                id: true,
                name: true,
                email: true,
                cellphone: true,
                cpf: true,
                rg: true,
                address: true,
                gender: true,
                profession: true,
                civilState: true,
                password: false,
            },
        });
    };

    getClientById = async (id) => {
        return await prisma.user.findUnique({
            where: { id, role: 'USER' },
            select: {
                id: true,
                name: true,
                email: true,
                cellphone: true,
                cpf: true,
                rg: true,
                address: true,
                gender: true,
                profession: true,
                civilState: true,
                password: false,
            },
        });
    };
}

export default UserRepository;
