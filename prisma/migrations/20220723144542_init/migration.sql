-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(191) NULL,
    `visitDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `drugs` JSON NOT NULL,
    `validDoctorPrescription` BOOLEAN NOT NULL,
    `code` INTEGER NOT NULL,
    `orderComplete` BOOLEAN NOT NULL DEFAULT false,
    `totalPurchase` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Patient_email_key`(`email`),
    UNIQUE INDEX `Patient_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pharmacist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `dateJoined` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `todaySales` JSON NOT NULL,
    `currentPatientCode` INTEGER NOT NULL,

    UNIQUE INDEX `Pharmacist_currentPatientCode_key`(`currentPatientCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accountant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `dateJoined` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drug` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `drugFamily` VARCHAR(20) NOT NULL,
    `manufactureDate` DATETIME(3) NOT NULL,
    `expirationDate` DATETIME(3) NOT NULL,
    `requiresDoctorPrescription` BOOLEAN NOT NULL,
    `price` INTEGER NOT NULL,
    `remaining` INTEGER NOT NULL,
    `supplierId` VARCHAR(191) NOT NULL,
    `supplierOrginazation` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pharmacist` ADD CONSTRAINT `Pharmacist_currentPatientCode_fkey` FOREIGN KEY (`currentPatientCode`) REFERENCES `Patient`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Drug` ADD CONSTRAINT `Drug_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Accountant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
