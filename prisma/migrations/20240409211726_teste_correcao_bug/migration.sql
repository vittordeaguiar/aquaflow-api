-- DropForeignKey
ALTER TABLE `task_assignment` DROP FOREIGN KEY `task_assignment_taskId_fkey`;

-- AlterTable
ALTER TABLE `task_assignment` MODIFY `taskId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `task_assignment` ADD CONSTRAINT `task_assignment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
