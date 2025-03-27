/*
  Warnings:

  - You are about to drop the column `userId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "tenant_id";

-- CreateTable
CREATE TABLE "_user_tenants" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_user_tenants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_user_tenants_B_index" ON "_user_tenants"("B");

-- AddForeignKey
ALTER TABLE "_user_tenants" ADD CONSTRAINT "_user_tenants_A_fkey" FOREIGN KEY ("A") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_tenants" ADD CONSTRAINT "_user_tenants_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
