import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import prisma from './PrismaClient';

async function main() {
    const hashedPassword = bcrypt.hashSync('123456789', 10);
    const categories = await prisma.category.createMany({
        data: Array.from({ length: 5 }).map(() => ({
            name: faker.commerce.department() + ' ' + faker.number.int({ min: 1, max: 1000 }), // ensure uniqueness
        })),
    });

    const categoryRecords = await prisma.category.findMany();

    const users: { id: number; role: Role }[] = [];

    for (let i = 0; i < 10; i++) {
        const role = i < 4 ? Role.Seller : Role.Buyer; // first 4 sellers, rest buyers
        const user = await prisma.user.create({
            data: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                hashedPassword,
                role,
            },
        });
        users.push({ id: user.id, role });
    }

    for (const seller of users.filter(u => u.role === Role.Seller)) {
        const numProducts = faker.number.int({ min: 5, max: 8 });
        for (let i = 0; i < numProducts; i++) {
            await prisma.product.create({
                data: {
                    seller_id: seller.id,
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
                    category_id: faker.helpers.arrayElement(categoryRecords).id,
                },
            });
        }
    }

    for (const buyer of users.filter(u => u.role === Role.Buyer)) {
        const cart = await prisma.cart.create({
            data: {
                user_id: buyer.id,
            },
        });

        const allProducts = await prisma.product.findMany();
        const selectedProducts = faker.helpers.arrayElements(allProducts, faker.number.int({ min: 1, max: 5 }));

        for (const product of selectedProducts) {
            await prisma.cartItem.create({
                data: {
                    cart_id: cart.id,
                    product_id: product.id,
                    quantity: faker.number.int({ min: 1, max: 3 }),
                },
            });
        }
    }
}

main()
    .then(async () => {
        console.log('✅ Seeding finished.');
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });
