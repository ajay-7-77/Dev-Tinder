const validation = require("validator");

const validator = (data) => {
  const { firstName, lastName, age, skills, password } = data.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid.");
  } else if (skills.length > 10) {
    throw new Error("Only upto 10 skills are allowed.");
  } else if (age < 18) {
    const requiredYears = 18 - age;
    throw new Error("You are underage. Please come after " + requiredYears);
  } else if (!validation.isStrongPassword(password)) {
    throw new Error("Enter a strong Password");
  }
};
module.exports = validator;
