const seedRoles = require('./roleSeed');
const seedMajors = require('./majorSeed');
const seedSemester = require('./semesterSeed');
const seedCategory = require('./categorySeed');
const seedStrength = require('./strengthSeed');
const seedFlightPlans = require('./flightPlanSeed')

async function runSeeds() {
  try {
    await seedRoles();
    await seedMajors();
    await seedSemester();
    await seedCategory();
    await seedStrength();
    await seedFlightPlans();
    console.log("🎉 All seeds completed");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
}

module.exports = runSeeds;
