const db = require("../models");
const Category = db.category;

module.exports = async function seedCategorys() {
  const count = await Category.count();
  if (count === 0) {
    await Category.bulkCreate([
      { name: "Career Fair", color: "blue", description:"Career Fair or Job Fair"  },
      { name: "Coffe and Chat", color: "red", description:"Speaker will come to the Brew" },
      { name: "Work Shop", color: "yellow", description:"Come get help on resumes" },
      { name: "Luncheon", color: "green", description:"Join for lunch and speakers" },
    ]);
    console.log("✅ Seeded Categorys");
  } else {
    console.log("ℹ️ Categorys already seeded");
  }
};
