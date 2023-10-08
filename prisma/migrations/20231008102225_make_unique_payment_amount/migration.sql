/*
  Warnings:

  - A unique constraint covering the columns `[laporanJobId]` on the table `PaymentAmount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seriesId]` on the table `PaymentAmount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PaymentAmount_laporanJobId_key` ON `PaymentAmount`(`laporanJobId`);

-- CreateIndex
CREATE UNIQUE INDEX `PaymentAmount_seriesId_key` ON `PaymentAmount`(`seriesId`);
