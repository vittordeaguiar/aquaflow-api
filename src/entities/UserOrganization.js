class UserOrganization {
    constructor({ userId, organizationId, role }) {
        this.userId = userId;
        this.organizationId = organizationId;
        this.role = role;
    }

    async validate() {
        if (!this.userId) throw new Error('Id do usuário não informado.');
        if (!this.organizationId) throw new Error('Id da organização não informado.');
        if (!this.isOwner) this.role = 'MEMBER';
    }
}

module.exports = UserOrganization;
