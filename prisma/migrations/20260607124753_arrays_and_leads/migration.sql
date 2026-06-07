/*
  Warnings:

  - The `techStack` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deliverables` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `results` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `images` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "techStack",
ADD COLUMN     "techStack" TEXT[],
DROP COLUMN "deliverables",
ADD COLUMN     "deliverables" TEXT[],
DROP COLUMN "results",
ADD COLUMN     "results" TEXT[],
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "BlogPost";

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'contact_form',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
