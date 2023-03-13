-- CreateTable
CREATE TABLE `USER_INFO` (
    `USER_ID` VARCHAR(255) NOT NULL,
    `USER_NAME` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`USER_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `USER_PRIVILEGE` (
    `USER_ID` VARCHAR(255) NOT NULL,
    `TRIAL` VARCHAR(16) NOT NULL DEFAULT 'N',

    PRIMARY KEY (`USER_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
