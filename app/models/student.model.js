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
      type: Sequelize.STRING,
    },
    estimatedGradSemester:{ 
      type: Sequelize.STRING,
    },
    points:{
      type: Sequelize.INT,
    },
    semestersFromGrad:{ 
      type: Sequelize.STRING,
    },
  },{ timestamps: false });
  return Student;
};
