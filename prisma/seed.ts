import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.restaurant.deleteMany();

  console.log("Seeding...");

  const cust1 = await prisma.customer.create({ data: { name: "Budi", phone: "08123456789" } });
  const cust2 = await prisma.customer.create({ data: { name: "Siti", phone: "08198765432" } });
  const cust3 = await prisma.customer.create({ data: { name: "Joko", phone: "08133344455" } });

  const res1 = await prisma.restaurant.create({ 
    data: { name: "Nasi Goreng Gila", description: "Pedas mantap", is_open: true } 
  });
  const res2 = await prisma.restaurant.create({ 
    data: { name: "Sate Ayam Madura", description: "Bumbu kacang asli", is_open: true } 
  });
  const res3 = await prisma.restaurant.create({ 
    data: { name: "Es Teh Solo", description: "Segar duniamu", is_open: false } 
  });

  await prisma.order.create({
    data: { customer_id: cust1.id, restaurant_id: res1.id, total_items: 2, eta_minutes: 30 }
  });

  await prisma.order.create({
    data: { customer_id: cust2.id, restaurant_id: res2.id, total_items: 1, eta_minutes: 20 }
  });

  await prisma.order.create({
    data: { customer_id: cust3.id, restaurant_id: res1.id, total_items: 5, eta_minutes: 60 }
  });

  await prisma.order.create({
    data: { customer_id: cust1.id, restaurant_id: res2.id, total_items: 3, eta_minutes: 40 }
  });

  await prisma.order.create({
    data: { customer_id: cust2.id, restaurant_id: res1.id, total_items: 1, eta_minutes: 20 }
  });

  console.log("Seeding done!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });