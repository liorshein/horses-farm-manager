import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../services/authService';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

type Props = {
  switchPage: (a: string) => void
}

type UserSubmitForm = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone_number: string
};

const Register = (props: Props) => {

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    address: Yup.string().required("Address is required"),
    phone_number: Yup.string().required("Phone number is required").matches(phoneRegExp, 'Phone number is not valid'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: UserSubmitForm) => {
    AuthService.register(data.fullname, data.username, data.email, data.password, data.phone_number, data.address)
    props.switchPage("Login")
  };

  return (
    <div className="register-form" >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            {...register('fullname')}
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.fullname?.message}</div>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            {...register('username')}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
              }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            {...register('address')}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.address?.message}</div>
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            {...register('phone_number')}
            className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.phone_number?.message}</div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
          <button type="button" onClick={() => props.switchPage("Login")}>Already a member? Log In!</button>
        </div>
      </form>
    </div >
  );
}

export default Register