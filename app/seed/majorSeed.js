const db = require("../models");
const Major = db.majors;

module.exports = async function seedMajors() {
  const count = await Major.count();
  if (count === 0) {
    await Major.bulkCreate([
        { name: "Undeclared" },
        { name: "Computer Science" },
        { name: "Business Administration" },
        { name: "Psychology" },
        { name: "Biology" },
        { name: "Mechanical Engineering" },
        { name: "Nursing" },
        { name: "Accounting" },
        { name: "Marketing" },
        { name: "Political Science" },
        { name: "Finance" },
        { name: "Communication Studies" },
        { name: "Education" },
        { name: "Economics" },
        { name: "Environmental Science" },
        { name: "Bible" }
      ]);
    console.log("✅ Seeded Majors");
  } else {
    console.log("ℹ️ Majors already seeded");
  }
};