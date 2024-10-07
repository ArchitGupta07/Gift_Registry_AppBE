-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEvents" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" SERIAL NOT NULL,
    "giftName" TEXT NOT NULL,
    "giftUrl" TEXT NOT NULL,
    "registryId" INTEGER NOT NULL,
    "giftStatus" BOOLEAN NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_registryId_fkey" FOREIGN KEY ("registryId") REFERENCES "Registry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
