module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
    semesterId: {
      type: Sequelize.INTEGER,
    },
    studentIdNo:{ 
      type: Sequelize.STRING,
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
