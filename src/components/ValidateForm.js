import React from 'react'
import {Form, Formik, useField} from 'formik'
import * as Yup from 'yup'
import '../App.css'

const CustomInputField = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div className="custom-input-field">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="input-field" {...props} {...field}/>
            {meta.touched && meta.error ? 
                <div className="error">{meta.error}</div>
            :null}
        </div>
    )
}

const ValidateForm = () => {
    return (
        <div className="validateForm">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    age: '',
                    email: ''
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required('First name is required!')
                        .min(3, 'First name must be at least 3 characters')
                        .max(25, 'First name should be at most 25 characters'),
                    lastName: Yup.string()
                        .required('Last name is required!')
                        .min(3, 'Last name must have at least 3 characters')
                        .max(25, 'Last name must be at most 25 characters'),
                    age: Yup.number()
                        .required('Age is required!'),
                    email: Yup.string()
                        .email('Invalid Email Address!')
                        .required('Email is required!')
                })}
                onSubmit={(values, {setSubmitting, resetForm})=>{
                    setTimeout(()=>{
                        alert(JSON.stringify(values, null, 2))
                        resetForm()
                        setSubmitting(false)
                    }, 2000)
                }}
            >
                {props => (
                    <Form>
                        <h1>Sign Up!</h1>
                        <CustomInputField label="First Name: " type="text" name="firstName" placeholder="First Name" />
                        <CustomInputField label="Last Name: " type="text" name="lastName" placeholder="Last Name" />
                        <CustomInputField label="Age: " type="number" name="age" />
                        <CustomInputField label="Email Address: " type="email" name="email" placeholder="janedoe@email.com" />
                        <button type="submit" className="submit-btn">{props.isSubmitting ? "Submitting": "Submit"}</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ValidateForm