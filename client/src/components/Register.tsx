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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  mobile: string
};

const Register = (props: Props) => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
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
    mobile: Yup.string().required("Phone number is required").matches(phoneRegExp, 'Phone number is not valid'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: UserSubmitForm) => {
    const results = await AuthService.register(data.name, data.email, data.password, data.mobile, data.address)
    if (results.data.success) {
      props.switchPage("Login")
    } else {
      alert("Cannot register, please try again!")
    }
  };

  return (
    <>
      <h1 className={styles.header}>Register!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder='Full Name'
            autoComplete='name'
            {...register('name')}
            className={errors.name ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.name?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Email</label>
          <input
            type="text"
            placeholder='Email'
            autoComplete='email'
            {...register('email')}
            className={errors.email ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.email?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input
            type="password"
            placeholder='Password'
            autoComplete='new-password'
            {...register('password')}
            className={errors.password ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.password?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder='Confirm Password'
            {...register('confirmPassword')}
            className={errors.confirmPassword ? styles.is_invalid : ''}
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
            autoComplete='street-address'
            {...register('address')}
            className={errors.address ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.address?.message}</div>
        </div>
        <div className={styles.form_group}>
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder='Phone Number'
            autoComplete='tel'
            {...register('mobile')}
            className={errors.mobile ? styles.is_invalid : ''}
          />
          <div className={styles.invalid_feedback}>{errors.mobile?.message}</div>
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