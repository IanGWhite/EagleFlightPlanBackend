const db = require("../models");
const Semester = db.semester;

module.exports = async function seedSemesters() {
  const count = await Semester.count();
  if (count === 0) {
    await Semester.bulkCreate([
      { name: "Spring 2025", dateStart: "2025-01-15", dateEnd: "2025-05-10" },      
      { name: "Fall 2025", dateStart: "2025-09-01", dateEnd: "2025-12-15" },
      { name: "Spring 2026", dateStart: "2026-01-15", dateEnd: "2026-05-10" },
      { name: "Fall 2026", dateStart: "2026-09-01", dateEnd: "2026-12-15" },
      { name: "Spring 2027", dateStart: "2027-01-15", dateEnd: "2027-05-10" },
      { name: "Fall 2027", dateStart: "2027-09-01", dateEnd: "2027-12-15" },
      { name: "Spring 2028", dateStart: "2028-01-15", dateEnd: "2028-05-10" },
      { name: "Fall 2028", dateStart: "2028-09-01", dateEnd: "2028-12-15" },
      { name: "Spring 2029", dateStart: "2029-01-15", dateEnd: "2029-05-10" },
      { name: "Fall 2029", dateStart: "2029-09-01", dateEnd: "2029-12-15" },
      { name: "Spring 2030", dateStart: "2030-01-15", dateEnd: "2030-05-10" },
      { name: "Fall 2030", dateStart: "2030-09-01", dateEnd: "2030-12-15" },
      { name: "Spring 2031", dateStart: "2031-01-15", dateEnd: "2031-05-10" },
      { name: "Fall 2031", dateStart: "2031-09-01", dateEnd: "2031-12-15" },
      { name: "Spring 2032", dateStart: "2032-01-15", dateEnd: "2032-05-10" },
      { name: "Fall 2032", dateStart: "2032-09-01", dateEnd: "2032-12-15" },
      { name: "Spring 2033", dateStart: "2033-01-15", dateEnd: "2033-05-10" },
      { name: "Fall 2033", dateStart: "2033-09-01", dateEnd: "2033-12-15" },
      { name: "Spring 2034", dateStart: "2034-01-15", dateEnd: "2034-05-10" },
      { name: "Fall 2034", dateStart: "2034-09-01", dateEnd: "2034-12-15" },
      { name: "Spring 2035", dateStart: "2035-01-15", dateEnd: "2035-05-10" }
    ]);
    console.log("✅ Seeded Semesters");
  } else {
    console.log("ℹ️ Semesters already seeded");
  }
};
