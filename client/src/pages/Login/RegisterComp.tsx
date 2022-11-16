import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./registerComp.module.scss";
import axios from "../../api/axios";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

type Props = {
    switchPage: (a: string) => void;
};

type UserSubmitForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    mobile: string;
};

const Register = (props: Props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Fullname is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must not exceed 40 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf(
                [Yup.ref("password"), null],
                "Confirm Password does not match"
            ),
        address: Yup.string().required("Address is required"),
        mobile: Yup.string()
            .required("Phone number is required")
            .matches(phoneRegExp, "Phone number is not valid"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: UserSubmitForm) => {
        const results = await axios.post("/register", {
            name: data.name,
            email: data.email,
            password: data.password,
            phone_number: data.mobile,
            address: data.address,
        });

        if (results.status === 201) {
            props.switchPage("Login");
        } else {
            alert("Cannot register, please try again!");
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center pb-16 sm:pb-0 max-sm:relative">
            <div className="w-full mx-10 mt-10 sm:mt-0">
                <h1 className="text-4xl mb-5 tracking-tight">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            autoComplete="name"
                            {...register("name")}
                            className={
                                errors.name
                                    ? "border-2 border-red-600 mb-1"
                                    : "mb-1"
                            }
                        />
                        <div className='text-xs h-1 mb-2 text-red-600'>
                            {errors.name?.message}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            autoComplete="email"
                            {...register("email")}
                            className={
                                errors.email
                                    ? "border-2 border-red-600 mb-1"
                                    : "mb-1"
                            }
                        />
                        <div className='text-xs h-1 mb-2 text-red-600'>
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            {...register("password")}
                            className={
                                errors.password
                                    ? "border-2 border-red-600 mb-1"
                                    : "mb-1"
                            }
                        />
                        <div className='text-xs h-1 mb-2 text-red-600'>
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                            className={
                                errors.confirmPassword
                                    ? "border-2 border-red-600 mb-1"
                                    : "mb-1"
                            }
                        />
                        <div className='text-xs h-1 mb-2 text-red-600'>
                            {errors.confirmPassword?.message}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="Address"
                            autoComplete="street-address"
                            {...register("address")}
                            className={
                                errors.address
                                    ? "border-2 border-red-600 mb-1"
                                    : "mb-1"
                            }
                        />
                        <div className='text-xs h-1 mb-2 text-red-600'>
                            {errors.address?.message}
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="font-semibold mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            autoComplete="tel"
                            {...register("mobile")}
                            className={
                                errors.mobile
                                    ? "border-2 border-red-600 mb-1"
                                    : "mb-1"
                            }
                        />
                        <div className='text-xs h-1 mb-2 text-red-600'>
                            {errors.mobile?.message}
                        </div>
                    </div>
                    <button
                        className='bg-slate-500 py-1 px-3 rounded-lg mr-1'
                        type="submit">
                        Register
                    </button>
                    <button
                        className='bg-slate-500 py-1 px-3 rounded-lg'
                        type="button"
                        onClick={() => reset()}>
                        Reset
                    </button>
                    <button
                        className='absolute bottom-2 right-4 hover:underline'
                        type="button"
                        onClick={() => props.switchPage("Login")}>
                        Already a member? Log In!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
