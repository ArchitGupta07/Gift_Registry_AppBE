-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGifts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,

    CONSTRAINT "UserGifts_pkey" PRIMARY KEY ("id")
);
