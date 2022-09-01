import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../services/authService';
import styles from "../pages/Login/registerComp.module.scss"

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
    <>
      <h1 className={styles.header}>Register!</h1>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder='Full Name'
            {...register('fullname')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.fullname?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Username</label>
          <input
            type="text"
            placeholder='Username'
            {...register('username')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.username?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Email</label>
          <input
            type="text"
            placeholder='Email'
            {...register('email')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.email?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input
            type="password"
            placeholder='Password'
            {...register('password')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.password?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder='Confirm Password'
            {...register('confirmPassword')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className={styles.form_group}>
          <label>Address</label>
          <input
            type="text"
            placeholder='Address'
            {...register('address')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.address?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder='Phone Number'
            {...register('phone_number')}
            className={errors.fullname ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.phone_number?.message}</div>
        </div>
        <button className={styles.signin_btn} type="submit">
          Register
        </button>
        <button
          className={styles.signin_btn}
          type="button"
          onClick={() => reset()}
        >
          Reset
        </button>
        <button className={styles.login_btn} type="button" onClick={() => props.switchPage("Login")}>Already a member? Log In!</button>
      </form>
    </>
  );
}

export default Register