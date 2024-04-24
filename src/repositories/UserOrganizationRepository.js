const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const RepositoryBase = require('./RepositoryBase');

class UserOrganizationRepository extends RepositoryBase {
    constructor() {
        super(prisma.userOrganization);
    }

    createUsersOrganization = async (usersOrganization) => {
        await prisma.userOrganization.createMany({
            data: usersOrganization,
        });
    };

    deleteByOrganizationId = async (organizationId) => {
        try {
            await prisma.userOrganization.deleteMany({
                where: { organizationId: organizationId },
            });
        } catch (error) {
            throw Error(
                `Não foi possível excluir o relacionamento, erro: ${error.message}`,
            );
        }
    };

    deleteByOrganizationIdAndUserId = async (organizationId, userId) => {
        try {
            await prisma.userOrganization.deleteMany({
                where: { organizationId, userId },
            });
        } catch (error) {
            throw Error(
                `Não foi possível excluir o relacionamento, erro: ${error.message}`,
            );
        }
    };

    updateOwner = async (organizationId, userId, role) => {
        try {
            await prisma.userOrganization.updateMany({
                where: {
                    organizationId,
                    userId,
                },
                data: { role },
            });
        } catch (error) {
            throw Error(
                `Não foi possível alterar o administrador, erro: ${error.message}`,
            );
        }
    };
}

module.exports = UserOrganizationRepository;
