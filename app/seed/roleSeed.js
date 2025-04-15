const db = require("../models");
const Role = db.role;

module.exports = async function seedRoles() {
  const count = await Role.count();
  if (count === 0) {
    await Role.bulkCreate([
        { name: "no Admin", canEditPoints: 0, canAddEvents: 0, canMarkAttendance: 0 },
        { name: "Full Admin", canEditPoints: 1, canAddEvents: 1, canMarkAttendance: 1 },
    ]);
    console.log("✅ Seeded Roles");
  } else {
    console.log("ℹ️ Roles already seeded");
  }
};
