export const capitalize = s => {
  return s && s[0].toUpperCase() + s.slice(1);
};

export const formatDecimal = s => {
  return `${parseFloat(s).toFixed(2)} %`;
};

export const calculateAge = dateString => {
  var today = new Date();
  var dob = new Date("1/1/2000");
  var age = today.getFullYear() - dob.getFullYear();
  return age;
};

export const isValidEmail = email => {
  const pattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return pattern.test(email);
};

export const isValidPhoneNumber = phoneNumber => {
  if (!phoneNumber || phoneNumber.length < 5 || phoneNumber.length > 15) {
    return false;
  }
  const pattern = /^-?\d*\.?\d*$/;
  return pattern.test(phoneNumber);
};

export const isValidUserName = username => {
  if (!username) {
    return false;
  }
  return true;
};
