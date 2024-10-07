-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('google', 'facebook', 'form');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('BIRTHDAY', 'WEDDING', 'ANNIVERSARY', 'BABY_SHOWER', 'OTHER');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" "EventType" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'google';
