module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
    semesterId: {
      type: Sequelize.STRING,
    },
    studentIdNo:{ 
      type: Sequelize.INTEGER,
    },
    estimatedGradSemester:{ 
      type: Sequelize.STRING,
    },
    points:{
      type: Sequelize.INTEGER,
    },
    semestersFromGrad:{ 
      type: Sequelize.INTEGER,
    },
  },{ timestamps: false });
  return Student;
};
