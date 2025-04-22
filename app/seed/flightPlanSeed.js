const db = require("../models");
const FlightPlan = db.flightPlans;

module.exports = async function seedFlightPlans() {
  const count = await FlightPlan.count();
  if (count === 0) {
    await FlightPlan.bulkCreate([
      { semesterId: 1 },      
      { semesterId: 2 },
      { semesterId: 3 },
      { semesterId: 4 },
      { semesterId: 5 },
      { semesterId: 6 },
      { semesterId: 7 },
      { semesterId: 8 },      
      { semesterId: 9 },
      { semesterId: 10 },
      { semesterId: 11 },
      { semesterId: 12 },
      { semesterId: 13 },      
      { semesterId: 14 },
      { semesterId: 15 },
      { semesterId: 16 },
      { semesterId: 17 },
      { semesterId: 18 },
      { semesterId: 19 },
      { semesterId: 20 },
      { semesterId: 21 },
    ]);
    console.log("✅ Seeded FlightPlans");
  } else {
    console.log("ℹ️ FlightPlans already seeded");
  }
};
