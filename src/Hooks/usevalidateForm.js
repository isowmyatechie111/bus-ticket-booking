const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const useValidateForm = (formValues) => {
  const errors = {};

  if (!formValues.name) errors.name = "UserName is required!";

  if (!formValues.email) errors.email = "Email is required!";
  else if (!regex.test(formValues.email))
    errors.email = "This is not the valid email";

  if (!formValues.password) errors.password = "Password is required!";
  else if (formValues.password.length < 4)
    errors.password = "Password must be more than 4 chars!";
  else if (formValues.password.length > 8)
    errors.password = "Password cannot exceed more than 8 chars!";

  if (!formValues.confirmPassword)
    errors.confirmPassword = "confirm Password is required!";
  else if (formValues.password !== formValues.confirmPassword)
    errors.confirmPassword =
      "Your password and confirmation password do not match";
  return errors;
};

export const useValidateFormForRegUsers = (formValues) => {
  const errors = {};
  if (!formValues.email) errors.email = "Email is required!";
  else if (!regex.test(formValues.email))
    errors.email = "This is not the valid email";
  if (!formValues.password) errors.password = "Password is required!";
  return errors;
};
