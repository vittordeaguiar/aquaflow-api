import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AddressRepository {
    create = async (data) => prisma.address.create({ data });

    update = async (data) => prisma.address.update({ where: { id: data.id }, data });
}

export default AddressRepository;
