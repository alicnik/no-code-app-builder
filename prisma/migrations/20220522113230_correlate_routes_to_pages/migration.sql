/*
  Warnings:

  - You are about to drop the column `appId` on the `Page` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_appId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "appId";

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "slug" TEXT NOT NULL;
