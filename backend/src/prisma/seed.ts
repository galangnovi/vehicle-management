import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


function randomDateInNovember2025() {
  const start = new Date(2025, 10, 1);
  const end = new Date(2025, 10, 30);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log(" Seeding database...");

  console.log(" Deleting old data...");
  await prisma.vehicleStatus.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.user.deleteMany({});


  const vehiclesData = [
    { name: "Truk Logistik ", lisensePlate: "B9011AA", type: "Truck", route: "Jakarta - Bandung", status: "running", lastPosition: "Cikampek" },
    { name: "Van Pengiriman ", lisensePlate: "B9022BB", type: "Van", route: "Depok - Bekasi", status: "stopped", lastPosition: "Bekasi Timur" },
    { name: "Mobil Operasional ", lisensePlate: "B9033CC", type: "Car", route: "Jakarta - Bogor", status: "maintenance", lastPosition: "Cibinong" },
    { name: "Bus Karyawan ", lisensePlate: "B9044DD", type: "Bus", route: "Tangerang - Jakarta", status: "running", lastPosition: "Slipi" },
    { name: "Truk Kontainer ", lisensePlate: "B9055EE", type: "Truck", route: "Cikarang - Tanjung Priok", status: "stopped", lastPosition: "Sunter" },
    { name: "Van Distribusi ", lisensePlate: "B9066FF", type: "Van", route: "Jakarta - Karawang", status: "running", lastPosition: "Bekasi Barat" },
    { name: "Mobil Sales ", lisensePlate: "B9077GG", type: "Car", route: "Jakarta - Depok", status: "stopped", lastPosition: "Lenteng Agung" },
    { name: "Bus Pariwisata ", lisensePlate: "B9088HH", type: "Bus", route: "Bandung - Puncak", status: "maintenance", lastPosition: "Puncak Pass" },
    { name: "Truk Ekspedisi ", lisensePlate: "B9099II", type: "Truck", route: "Bekasi - Surabaya", status: "running", lastPosition: "Karawang" },
    { name: "Van Operasional ", lisensePlate: "B9100JJ", type: "Van", route: "Jakarta - Bogor", status: "stopped", lastPosition: "Citeureup" },
    { name: "Mobil Dinas ", lisensePlate: "B9111KK", type: "Car", route: "Jakarta - Tangerang", status: "running", lastPosition: "Kebon Jeruk" },
    { name: "Bus Antar Kota ", lisensePlate: "B9122LL", type: "Bus", route: "Jakarta - Yogyakarta", status: "maintenance", lastPosition: "Cirebon" },
    { name: "Truk Pengangkut ", lisensePlate: "B9133MM", type: "Truck", route: "Bogor - Sukabumi", status: "running", lastPosition: "Ciawi" },
    { name: "Van Logistik ", lisensePlate: "B9144NN", type: "Van", route: "Jakarta - Serang", status: "stopped", lastPosition: "Serpong" },
    { name: "Mobil Inspeksi ", lisensePlate: "B9155OO", type: "Car", route: "Jakarta - Cikarang", status: "running", lastPosition: "Bekasi" },
  ];

  const createdVehicles = [];

  for (let i = 0; i < vehiclesData.length; i++) {
    const v = vehiclesData[i];

    const vehicle = await prisma.vehicle.create({
      data: {
        ...v,
        updatedAt: randomDateInNovember2025(), 
      },
    });

    createdVehicles.push(vehicle);

    const baseDate = new Date(2025, 10, 1 + (i % 9));
    const statuses = [
      { status: "stopped", updatedAt: new Date(baseDate.getTime() + 1000 * 60 * 60 * 3) },
      { status: "running", updatedAt: new Date(baseDate.getTime() + 1000 * 60 * 60 * 5) },
      { status: v.status, updatedAt: new Date(baseDate.getTime() + 1000 * 60 * 60 * 7) },
    ];

    for (const s of statuses) {
      await prisma.vehicleStatus.create({
        data: {
          status: s.status,
          updatedAt: s.updatedAt,
          vehicleId: vehicle.id,
          dateTime: s.updatedAt,
          position: vehicle.lastPosition,
          information: "Pembaruan status kendaraan",
        },
      });
    }
  }

  const adminPassword = await bcrypt.hash("123456", 10);
  await prisma.user.create({
    data: {
      name: "Admin Utama",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
    },
  });

  const userNames = [
    "Andi Pratama",
    "Siti Nurhaliza",
    "Budi Santoso",
    "Dewi Lestari",
    "Rizky Maulana",
    "Fitri Handayani",
    "Hendra Gunawan",
    "Putri Ayu",
    "Adi Saputra",
    "Rina Kurnia",
    "Bagas Nugroho",
    "Lina Marlina",
    "Fajar Ramadhan",
    "Nia Rahmawati",
    "Eko Susanto",
  ];

  for (const [index, vehicle] of createdVehicles.entries()) {
    const name = userNames[index] || `User ${index + 1}`;
    const email = `${name.toLowerCase().replace(/ /g, ".")}@example.com`;
    const password = await bcrypt.hash("123456", 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "user",
        vehicleId: vehicle.id,
      },
    });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(" Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
