module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    studentIdNo: {
      type: Sequelize.STRING,
    },
    estimatedGradSemester: {
      type: Sequelize.DATE,
    },
    points: {
      type: Sequelize.INTEGER,
    },
    semestersFromGrad: {
      type: Sequelize.INTEGER,
    },
  },{ timestamps: false });
  return Student;
};
/*
    userId: req.param.userId,
    studentId: req.param.studentId,
    studentIdNo: req.body.studentIdNo,
    estimatedGradSemester: req.body.estimatedGradSemester,
    points: req.body.points,
    semestersFromGrad: req.body.semestersFromGrad,
*/