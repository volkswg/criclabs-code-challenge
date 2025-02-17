/*
  Warnings:

  - You are about to drop the column `data_subject_type_id` on the `data_mapping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "data_mapping" DROP CONSTRAINT "data_mapping_data_subject_type_id_fkey";

-- AlterTable
ALTER TABLE "data_mapping" DROP COLUMN "data_subject_type_id";

-- CreateTable
CREATE TABLE "data_mapping_data_subject_type" (
    "data_mapping_id" INTEGER NOT NULL,
    "data_subject_type_id" INTEGER NOT NULL,

    CONSTRAINT "data_mapping_data_subject_type_pkey" PRIMARY KEY ("data_mapping_id","data_subject_type_id")
);

-- AddForeignKey
ALTER TABLE "data_mapping_data_subject_type" ADD CONSTRAINT "data_mapping_data_subject_type_data_mapping_id_fkey" FOREIGN KEY ("data_mapping_id") REFERENCES "data_mapping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_mapping_data_subject_type" ADD CONSTRAINT "data_mapping_data_subject_type_data_subject_type_id_fkey" FOREIGN KEY ("data_subject_type_id") REFERENCES "data_subject_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
