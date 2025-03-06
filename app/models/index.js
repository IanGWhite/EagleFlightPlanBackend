const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.lesson = require("./lesson.model.js")(sequelize, Sequelize);

db.award = require("./award.model.js")(sequelize, Sequelize);
db.contact = require("./contact.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

db.resumeAward = require("./resumeAward.model.js")(sequelize, Sequelize);
db.resumeEducation = require("./resumeEducation.model.js")(sequelize, Sequelize);
db.resumeExperience = require("./resumeExperience.model.js")(sequelize, Sequelize);
db.resumeInterest = require("./resumeInterest.model.js")(sequelize, Sequelize);
db.resumeLink = require("./resumeLink.model.js")(sequelize, Sequelize);
db.resumeProject = require("./resumeProject.model.js")(sequelize, Sequelize);
db.resumeSkill = require("./resumeSkill.model.js")(sequelize, Sequelize);


db.document = require("./document.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.eventAttended = require("./eventAttended.model.js")(sequelize, Sequelize);
db.pointLog = require("./pointLog.model.js")(sequelize, Sequelize);
db.studentEagleTask = require("./studentEagleTask.model.js")(sequelize, Sequelize);
db.eagleTask = require("./eagleTask.model.js")(sequelize, Sequelize);
db.userRole = require("./userRole.model.js")(sequelize, Sequelize);
db.eagleExperienceEvent = require("./eagleExperienceEvent.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.shopItem = require("./shopItem.model.js")(sequelize, Sequelize);

db.eagleExperiences = require("./eagleExperiences.model.js")(sequelize, Sequelize);
db.studentEagleExperiences = require("./studentEagleExperiences.model.js")(sequelize, Sequelize);
db.studentBadges = require("./studentBadges.model.js")(sequelize, Sequelize);
db.badgeExperiences = require("./BadgeExperiences.model.js")(sequelize, Sequelize);
db.badgeTasks = require("./badgeTasks.model.js")(sequelize, Sequelize);
db.studentStrengths = require("./studentStrengths.model.js")(sequelize, Sequelize);
db.studentMajors = require("./studentMajors.model.js")(sequelize, Sequelize);
db.badges = require("./badges.model.js")(sequelize, Sequelize);
db.majors = require("./majors.model.js")(sequelize, Sequelize);
db.strengths = require("./strengths.model.js")(sequelize, Sequelize);
db.eagleExperienceMajors = require("./eagleExperienceMajors.model.js")(sequelize, Sequelize);
db.eagleTaskMajors = require("./eagleTaskMajors.model.js")(sequelize, Sequelize);
db.eagleFlightPlans = require("./eagleFlightPlans.model.js")(sequelize, Sequelize);
db.badgeEvents = require("./badgeEvents.model.js")(sequelize, Sequelize);



// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for students
db.user.hasOne(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//userRole
db.userRole.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.user.hasOne(
  db.userRole,
  { as: "userRole" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.role.hasMany(
  db.userRole, 
  {as: "userRole"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
)

// foreign key for lessons
db.student.hasMany(
  db.lesson,
  { as: "lesson" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.lesson.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// RESUME HAS
db.student.hasMany(
  db.award,
  {as: "award"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.award.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasOne(
  db.contact,
  {as: "contact"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.contact.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.education,
  {as: "education"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.education.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.experience,
  {as: "experience"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.experience.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.interest,
  {as: "interest"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.interest.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.link,
  {as: "link"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.link.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.project,
  {as: "project"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.project.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.student.hasMany(
  db.skill,
  {as: "skill"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.skill.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resume.hasMany(
  db.comment,
  {as: "comment"},
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.comment.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);



//BELONGS TO
db.resumeAward.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeAward,
  {as: "resumeAward"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.contact.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasOne(
  db.contact,
  {as: "contact"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumeEducation.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeEducation,
  {as: "resumeEducation"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumeExperience.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeExperience,
  {as: "resumeExperience"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumeInterest.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeInterest,
  {as: "resumeInterest"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumeLink.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeLink,
  {as: "resumeLink"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumeProject.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeProject,
  {as: "resumeProject"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.resumeSkill.belongsTo(
  db.resume,
  { as: "resume" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.resume.hasMany(
  db.resumeSkill,
  {as: "resumeSkill"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// resume middleman has
db.award.hasMany(
  db.resumeAward,
  {as: "resumeAward"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.education.hasMany(
  db.resumeEducation,
  {as: "resumeEducation"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


db.experience.hasMany(
  db.resumeExperience,
  {as: "resumeExperience"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


db.interest.hasMany(
  db.resumeInterest,
  {as: "resumeInterest"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


db.link.hasMany(
  db.resumeLink,
  {as: "resumeLink"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.project.hasMany(
  db.resumeProject,
  {as: "resumeProject"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.skill.hasMany(
  db.resumeSkill,
  {as: "resumeSkill"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//eagleFlightPlans
db.eagleFlightPlans.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasMany(
  db.eagleFlightPlans,
  { as: "eagleFlightPlans" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.semester.hasMany(
  db.eagleFlightPlans,
  { as: "eagleFlightPlans" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Strengths 
db.studentStrengths.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasMany(
  db.studentStrengths,
  { as: "studentStrengths" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.strengths.hasMany(
  db.studentStrengths,
  {as: "studentStrengths"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//majors
db.studentMajors.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasOne(
  db.studentMajors,
  { as: "studentMajors" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.majors.hasMany(
  db.studentMajors,
  {as: "studentMajors"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//eventAttended
db.eventAttended.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasMany(
  db.eventAttended,
  { as: "eventAttended" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.hasMany(
  db.eventAttended,
  {as: "eventAttended"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//pointLog
db.pointLog.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasMany(
  db.pointLog,
  { as: "pointLog" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.shopItem.hasMany(
  db.pointLog, 
  {as: "pointLog"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//studentBadges

db.studentBadges.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasMany(
  db.studentBadges,
  { as: "studentBadges" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.badges.hasMany(
  db.studentBadges, 
  {as: "studentBadges"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//documents
db.document.belongsTo(
  db.student,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.student.hasMany(
  db.document,
  { as: "document" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//badgeEvents
db.badgeEvents.belongsTo(
  db.badges,
  { as: "badges" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.badges.hasMany(
  db.badgeEvents,
  { as: "badgeEvents" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.hasMany(
  db.badgeEvents, 
  {as: "badgeEvents"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//badgeExperiences
db.badgeExperiences.belongsTo(
  db.badges,
  { as: "badges" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.badges.hasMany(
  db.badgeExperiences,
  { as: "badgeExperiences" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleExperiences.hasMany(
  db.badgeExperiences, 
  {as: "badgeExperiences"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//badgeTasks
db.badgeTasks.belongsTo(
  db.badges,
  { as: "badges" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.badges.hasMany(
  db.badgeTasks,
  { as: "badgeTasks" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleTask.hasMany(
  db.badgeTasks, 
  {as: "badgeTasks"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//studentEagleTask
// db.studentEagleTask.belongsTo(
//   db.eagleFlightPlans,
//   { as: "eagleFlightPlans" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.eagleFlightPlans.hasMany(
//   db.studentEagleTask,
//   { as: "studentEagleTask" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
db.studentEagleTask.belongsTo(
  db.eagleFlightPlans,
  { as: "eagleFlightPlan" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleFlightPlans.hasMany(
  db.studentEagleTask,
  { as: "studentEagleTasks" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleTask.hasMany(
  db.studentEagleTask, 
  {as: "studentEagleTask"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//studentEagleExperiences
db.studentEagleExperiences.belongsTo(
  db.eagleFlightPlans,
  { as: "eagleFlightPlan" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleFlightPlans.hasMany(
  db.studentEagleExperiences,
  { as: "studentEagleExperiences" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleExperiences.hasMany(
  db.studentEagleExperiences, 
  {as: "studentEagleExperiences"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//eagleExperienceEvent
db.eagleExperienceEvent.belongsTo(
  db.eagleExperiences,
  { as: "eagleExperiences" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleExperiences.hasMany(
  db.eagleExperienceEvent,
  { as: "eagleExperienceEvent" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.hasMany(
  db.eagleExperienceEvent, 
  {as: "eagleExperienceEvent"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//eagleExperienceMajor
db.eagleExperienceMajors.belongsTo(
  db.eagleExperiences,
  { as: "eagleExperiences" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleExperiences.hasMany(
  db.eagleExperienceMajors,
  { as: "eagleExperienceMajors" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.majors.hasMany(
  db.eagleExperienceMajors, 
  {as: "eagleExperienceMajors"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//eagleTaskMajors
db.eagleTaskMajors.belongsTo(
  db.eagleTask,
  { as: "eagleExperiences" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eagleTask.hasMany(
  db.eagleTaskMajors,
  { as: "eagleTaskMajors" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.majors.hasMany(
  db.eagleTaskMajors, 
  {as: "eagleTaskMajors"},
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
