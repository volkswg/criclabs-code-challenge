import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const departmentData = [
  { id: 1, value: 'Human Resources' },
  { id: 2, value: 'IT/IS' },
  { id: 3, value: 'Admission' },
  { id: 4, value: 'Marketing' },
];

const dataSubjectTypeData = [
  { id: 1, value: 'Employees' },
  { id: 2, value: 'Faculty Staff' },
  { id: 3, value: 'Students' },
];

const userData = [
  {
    id: 1,
    email: 'test@mail.com',
    password: '$2a$10$ysHk2qlMqMUiweeVL6JfwuO6DbsD70EcQqgtirnwcj4jqVJ.Y0wJe',
  },
];

async function main() {
  for (const e of departmentData) {
    await prisma.department.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        value: e.value,
      },
    });
  }
  for (const e of dataSubjectTypeData) {
    await prisma.dataSubjectType.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        value: e.value,
      },
    });
  }
  for (const e of userData) {
    await prisma.users.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        email: e.email,
        password: e.password,
      },
    });
  }
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
