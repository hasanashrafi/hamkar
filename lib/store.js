import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function readJson(filename, fallback) {
  const filePath = path.join(dataDir, filename);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeJson(filename, fallback);
      return fallback;
    }
    throw error;
  }
}

async function writeJson(filename, value) {
  const filePath = path.join(dataDir, filename);
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function getProducts() {
  return readJson("products.json", []);
}

export async function saveProducts(products) {
  await writeJson("products.json", products);
}

export async function getOrders() {
  return readJson("orders.json", []);
}

export async function saveOrders(orders) {
  await writeJson("orders.json", orders);
}
