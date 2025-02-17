-- CreateTable
CREATE TABLE "data_mapping" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "department_id" INTEGER NOT NULL,
    "data_subject_type_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "data_mapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "data_mapping" ADD CONSTRAINT "data_mapping_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_mapping" ADD CONSTRAINT "data_mapping_data_subject_type_id_fkey" FOREIGN KEY ("data_subject_type_id") REFERENCES "data_subject_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
