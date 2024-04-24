CREATE TABLE `UserOrganization` (
    `userId` INTEGER NOT NULL,
    `organizationId` INTEGER NOT NULL,
    `role` ENUM('ADMIN', 'MEMBER') NOT NULL,

    PRIMARY KEY (`userId`, `organizationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `UserOrganization` (`userId`, `organizationId`, `role`)
SELECT `id`, `organizationId`, 'MEMBER' FROM `users` WHERE `organizationId` IS NOT NULL;

ALTER TABLE `users` DROP FOREIGN KEY `users_organizationId_fkey`;
ALTER TABLE `users` DROP COLUMN `organizationId`;

ALTER TABLE `UserOrganization` ADD CONSTRAINT `UserOrganization_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `UserOrganization` ADD CONSTRAINT `UserOrganization_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
