const db = require("../models");
const Strength = db.strengths;

const seedStrengths = async () => {
  const count = await Strength.count();
  if (count === 0) {
    const strengths = [
      "","Achiever", "Activator", "Adaptability", "Analytical", "Arranger",
      "Belief", "Command", "Communication", "Competition", "Connectedness",
      "Consistency", "Context", "Deliberative", "Developer", "Discipline",
      "Empathy", "Focus", "Futuristic", "Harmony", "Ideation",
      "Includer", "Individualization", "Input", "Intellection", "Learner",
      "Maximizer", "Positivity", "Relator", "Responsibility", "Restorative",
      "Self-Assurance", "Significance", "Strategic", "Woo"
    ];

    const strengthObjects = strengths.map(name => ({ name }));

    try {
      await Strength.bulkCreate(strengthObjects, { ignoreDuplicates: true });
      console.log("✅ CliftonStrengths seeded successfully");
    } catch (error) {
      console.error("❌ Error seeding strengths:", error);
    }
  } else {
    console.log("ℹ️ strengths already seeded");
  }

};

module.exports = seedStrengths;
