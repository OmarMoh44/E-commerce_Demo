import prisma from "./PrismaClient";

async function main() {
    // Clear the database by truncating all tables
    await prisma.cartItem.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("Database cleared!");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
