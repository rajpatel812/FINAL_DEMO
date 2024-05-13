import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Please Enter your name"),
  // userName: Yup.string().required('Please Enter your username'),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Please Enter your email"),
  // mobileNo: Yup.number()
  // 	.typeError("That doesn't look like a mobile number")
  // 	.positive("A mobile number can't start with a minus")
  // 	.integer("A mobile number can't include a decimal point")
  // 	.test(
  // 		'Mobile number must be exactly 10 digits',
  // 		(val: any) => val.toString().length === 10
  // 	)
  // 	.required('Please Enter your mobile no'),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please Enter your Confirm password"),
});

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Please Enter your email"),
  password: Yup.string().required("Please Enter your password"),
});

// const PHONE_REGEX = "^\+?91\d{10}$"

const updateUser = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email("Invalid email address format"),
  contact_no: Yup.number()
    .typeError("That doesn't look like a mobile number")
    .positive("A mobile number can't start with a minus")
    .integer("A mobile number can't include a decimal point")
    .test("is-ten-digits", "Mobile number must be exactly 10 digits", (val) => {
      if (!val) return false;
      return val.toString().length === 10;
    }),
  occupation: Yup.string().matches(
    /^[^0-9]*$/,
    "Occupation must not contain numbers"
  ),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
});

export { registerSchema, loginValidation, updateUser };
