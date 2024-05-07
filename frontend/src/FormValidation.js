import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .required('Name is required')
        .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid gmail address (e.g., example@gmail.com).')
        .email('Invalid email format')
        .required('Email is required'),
    mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required('Mobile number is required'),
    password: Yup.string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});

export const signInValidationSchema = Yup.object({
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._-]+@gmail\.com$/, 'Please enter a valid gmail address (e.g., example@gmail.com).')
        .email('Invalid email format')
        .required('Please enter the email'),
    password: Yup.string()
        .trim()
        .required('Please enter the password')
});
