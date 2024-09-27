-- DropForeignKey
ALTER TABLE "Gift" DROP CONSTRAINT "Gift_registryId_fkey";

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_registryId_fkey" FOREIGN KEY ("registryId") REFERENCES "Registry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
