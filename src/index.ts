import { TempManager } from "./modules/tmpManager";
const tempManager = new TempManager();

async function main() {
  try {
    const data = await tempManager.Get();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

main();