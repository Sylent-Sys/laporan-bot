import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.laporanJob.deleteMany({})
    await prisma.laporanJob.createMany({
        data: [
            {
                nama: "TL"
            },
            {
                nama: "ED"
            }
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })