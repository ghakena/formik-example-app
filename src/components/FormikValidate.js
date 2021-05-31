import React from 'react';
import * as Yup from 'yup';
import { Form, useField, Formik } from 'formik';
import '../App.css';

const CustomInputFields = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className="text-input-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props}/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </div>
  )
}
const CustomCheckbox = ({children, ...props}) => {
  const [field, meta] = useField(props, 'checkbox')
  return (
    <div className="checkbox-group">
      <label className="checkbox">
        <input type="checkbox" {...field} {...props}/>
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </div>
  )
}
const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className="custom-select-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}/>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </div>
  )
}

const FormikValidate = () => {
  return (
    <div className="FormikValidate">
      <Formik
          initialValues={{
            name: '',
            email: '',
            acceptedTerms: false,
            specialPower: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, 'Must be at least 3 characters')
              .max(25, 'Must be 25 characters or less.')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            acceptedTerms: Yup.boolean()
              .required('Required')
              .oneOf([true], 'You must accept the terms & conditions'),
            specialPower: Yup.string()
              .required('Required')
              .oneOf(['flight', 'wealth', 'invisibility', 'storm', 'other'])            
          })}
          onSubmit={(values, {setSubmitting, resetForm})=>{
            setTimeout(()=>{
              alert(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
            }, 3000)
          }}
        >
          {/* use a render prop, will give us back some props to render out. */}
          {props => (
            <Form>
              <h1>Sign Up!</h1>
              <CustomInputFields name="name" label="Name" type="text" placeholder="Enter Name" />
              <CustomInputFields name="email" label="Email" type="email" placeholder="Enter Email Address" />
              <CustomSelect label="Special Power" name="specialPower">
                <option value="">Select Special Power</option>
                <option value="flight">flight</option>
                <option value="wealth">wealth</option>
                <option value="invisibility">invisibility</option>
                <option value="storm">storm</option>
                <option value="other">other</option>
              </CustomSelect>
              <CustomCheckbox name="acceptedTerms">
                I accept the terms & conditions
              </CustomCheckbox>
              <button className="submit-btn" type="submit">{props.isSubmitting ? "Submitting...": "Submit"}</button>
            </Form>
          )}
        </Formik>
    </div>
  )
}

export default FormikValidate;