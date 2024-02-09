/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `cities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedules_cityId_key";

-- DropIndex
DROP INDEX "schedules_userId_key";

-- DropIndex
DROP INDEX "schedules_washTypeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");
