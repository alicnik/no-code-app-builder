/*
  Warnings:

  - You are about to drop the column `title` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Route` table. All the data in the column will be lost.
  - Added the required column `title` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
