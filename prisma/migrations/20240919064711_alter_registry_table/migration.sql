-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MEMBER');

-- AlterTable
ALTER TABLE "Registry" ADD COLUMN     "eventId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);
