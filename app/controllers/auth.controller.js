const db = require("../models");
const authconfig = require("../config/auth.config");
const User = db.user;
const Session = db.session;
const Student = db.student;
const StudentMajor = db.studentMajors;
const StudentStrengths = db.studentStrengths;
const FlightPlan = db.flightPlans;
const EagleFlightPlan = db.eagleFlightPlans;
const Op = db.Sequelize.Op;
const UserRole = db.userRole;
const { google } = require("googleapis");

var jwt = require("jsonwebtoken");

let googleUser = {};
const google_id = process.env.CLIENT_ID;

exports.login = async (req, res) => {
  console.log(req.body);
  var googleToken = req.body.credential;
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(google_id);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: google_id,
    });
    googleUser = ticket.getPayload();
    console.log("Google payload is " + JSON.stringify(googleUser));
  }
  try {
    // Verify the Google token
    await verify().catch(console.error);
    let email = googleUser.email;
    let firstName = googleUser.given_name;
    let lastName = googleUser.family_name;

    if (!email || !firstName || !lastName) {
      // handle missing data or create another request logic here
    }

    // Find or create User
    let user = {};
    await User.findOne({ where: { email: email } })
      .then((data) => {
        if (data != null) {
          user = data.dataValues;
        } else {
          user = { email: email, admin: 0, fName: firstName, lName: lastName, isStudent: true };
        }
      });

    // Check if user id is found before proceeding
    if (!user.id) {
      await User.create(user).then((data) => {
        user = data.dataValues;
      });
    }

    // Find or create Student
    let student = {};
    await Student.findOne({ where: { userId: user.id, fName: firstName, lName: lastName, studentId: user.id } })
      .then((data) => {
        if (data != null) {
          student = data.dataValues;
        } else {
          student = {
            userId: user.id,
            fName: firstName,
            lName: lastName,
            studentId: user.id,
            points: 0,
            semestersFromGrad: 8,
            estimatedGradSemester: 8,
            studentIdNo: 0,
          };
        }
      });

    // If student doesn't exist, create one
    if (!student.id) {
      await Student.create(student).then((data) => {
        student = data.dataValues;
      });
    } else {
      student.userId = user.id;
      student.fName = firstName;
      student.lName = lastName;
      await Student.update(student, { where: { id: student.id } });
    }

    // Find or create UserRole
    let userRole = {};
    await UserRole.findOne({ where: { userId: user.id } })
      .then((data) => {
        if (data != null) {
          userRole = data.dataValues;
        } else {
          userRole = { userId: user.id, roleId: 1 };
        }
      });

    // If userRole doesn't exist, create one
    if (!userRole.id) {
      await UserRole.create(userRole).then((data) => {
        userRole = data.dataValues;
      });
    }

    // Find or create StudentMajor
    let studentMajor = {};
    await StudentMajor.findOne({ where: { studentId: student.id } })
      .then((data) => {
        if (data != null) {
          studentMajor = data.dataValues;
        } else {
          studentMajor = { studentId: student.id, majorId: 1 };
        }
      });

    // If StudentMajor doesn't exist, create one
    if (!studentMajor.id) {
      await StudentMajor.create(studentMajor).then((data) => {
        studentMajor = data.dataValues;
      });
    }

    // Handle StudentStrengths - Ensure exactly 5 strengths
    const existingStrengths = await StudentStrengths.findAll({ where: { studentId: student.id } });
    if (!existingStrengths || existingStrengths.length !== 5) {
      await StudentStrengths.destroy({ where: { studentId: student.id } });

      const newStrengths = [
        { studentId: student.id, strengthId: 1 },
        { studentId: student.id, strengthId: 1 },
        { studentId: student.id, strengthId: 1 },
        { studentId: student.id, strengthId: 1 },
        { studentId: student.id, strengthId: 1 },
      ];

      for (const strength of newStrengths) {
        await StudentStrengths.create(strength);
      }
      console.log("StudentStrengths reset with 5 strengths");
    }

    //flight plan
    let eagleFlightPlan = {};
    await EagleFlightPlan.findOne({ where: { studentId: student.id } })
      .then((data) => {
        if (data != null) {
          eagleFlightPlan = data.dataValues
          
        } else {
            eagleFlightPlan = {studentId: student.id, semesterId: 1}
        }
      });

    // If eagle flight plan doesn't exist, create one
    if (!eagleFlightPlan.id) {
      await EagleFlightPlan.create(eagleFlightPlan).then((data) =>{
        eagleFlightPlan = data.dataValues;
      })
    }

    // Find existing session or create a new one
    let session = {};
    await Session.findOne({ where: { email: email, token: { [Op.ne]: "" } } })
      .then(async (data) => {
        if (data) {
          session = data.dataValues;
          if (session.expirationDate < Date.now()) {
            session.token = "";
            await Session.update(session, { where: { id: session.id } });
            session = {};  // reset session for new one
          } else {
            let userInfo = { email: user.email, fName: firstName, lName: lastName, userId: user.id, studentId: student.id, token: session.token };
            return res.send(userInfo);  // Send response here and stop
          }
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err.message });
      });

    // Create a new session if no valid session found
    if (!session.id) {
      let token = jwt.sign({ id: email }, authconfig.secret, { expiresIn: 86400 });
      let tempExpirationDate = new Date();
      tempExpirationDate.setDate(tempExpirationDate.getDate() + 1);

      await Session.create({ token, email, userId: user.id, expirationDate: tempExpirationDate })
        .then(() => {
          let userInfo = { email: user.email, fName: firstName, lName: lastName, userId: user.id, studentId: student.id, token };
          return res.send(userInfo);  // Send response here and stop
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "An error occurred during login." });
  }
};

exports.authorize = async (req, res) => {
  console.log("authorize client");
  const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");

  console.log("authorize token");
  let { tokens } = await oauth2Client.getToken(req.body.code);
  oauth2Client.setCredentials(tokens);

  let user = {};
  console.log("findUser");

  await User.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });

  user.refresh_token = tokens.refresh_token;
  let tempExpirationDate = new Date();
  tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
  user.expiration_date = tempExpirationDate;

  await User.update(user, { where: { id: user.id } })
    .then((num) => {
      if (num == 1) {
        console.log("updated user's google token stuff");
      } else {
        console.log(`Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`);
      }
      let userInfo = { refresh_token: user.refresh_token, expiration_date: user.expiration_date };
      console.log(userInfo);
      res.send(userInfo);
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });

  console.log(tokens);
  console.log(oauth2Client);
};

exports.logout = async (req, res) => {
  console.log(req.body);
  if (req.body === null) {
    res.send({ message: "User has already been successfully logged out!" });
    return;
  }

  let session = {};
  await Session.findAll({ where: { token: req.body.token } })
    .then((data) => {
      if (data[0] !== undefined) session = data[0].dataValues;
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });

  session.token = "";

  if (session.id !== undefined) {
    Session.update(session, { where: { id: session.id } })
      .then((num) => {
        if (num == 1) {
          console.log("successfully logged out");
          res.send({ message: "User has been successfully logged out!" });
        } else {
          console.log("failed");
          res.send({ message: `Error logging out user.` });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "Error logging out user." });
      });
  } else {
    console.log("already logged out");
    return res.send({ message: "User has already been successfully logged out!" });
  }
};
