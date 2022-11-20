import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../../api/axios";
import {
    AiOutlineMail,
    AiOutlineHome,
    AiOutlinePhone,
    AiOutlineUser,
} from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { AxiosError } from "axios";
const horseDrawing = require("../../assets/images/horseDrawing2.png");

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
        try {
            const response = await axios.post("/register", {
                name: data.name,
                email: data.email,
                password: data.password,
                phone_number: data.mobile,
                address: data.address,
            });
            alert(response.data.message)
            props.switchPage("Login");
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message);
            }
        }
    };

    return (
        <div className="h-screen w-screen flex content-center items-center justify-center bg-loginImage bg-cover bg-no-repeat">
            <div
                className="relative bg-[#686d6f7a] py-9 px-10 rounded z-[1] overflow-hidden shadow-2xl animate-[login_0.88s_ease]
            after:absolute after:top-0 after:left-0 after:h-full after:bg-loginImage after:w-full after:-z-[1] after:bg-[length:182vh] after:bg-[position:28%,_83%] after:blur-xl after:bg-no-repeat after:opacity-80">
                <h1 className="text-4xl font-normal text-center mb-4 text-white tracking-tight">
                    Register a new account
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Full Name
                        </label>
                        <div className="relative">
                            <AiOutlineUser className="absolute left-2 bottom-2.5" />
                            <input
                                type="text"
                                className={`w-full p-2 pl-8 outline-none ${
                                    errors.name
                                        ? "border-2 border-red-600"
                                        : "border-none"
                                } text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50`}
                                placeholder="Full Name"
                                {...register("name")}
                            />
                        </div>
                        <div className="text-xs h-1 mb-2 text-red-600">
                            {errors.name?.message}
                        </div>
                    </div>
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Email
                        </label>
                        <div className="relative">
                            <AiOutlineMail className="absolute left-2 bottom-2.5" />
                            <input
                                type="text"
                                className={`w-full p-2 pl-8 outline-none ${
                                    errors.name
                                        ? "border-2 border-red-600"
                                        : "border-none"
                                } text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50`}
                                placeholder="Email"
                                {...register("email")}
                            />
                        </div>
                        <div className="text-xs h-1 mb-2 text-red-600">
                            {errors.email?.message}
                        </div>
                    </div>
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Password
                        </label>
                        <div className="relative">
                            <BiLockAlt className="absolute left-2 bottom-2.5" />
                            <input
                                type="password"
                                className={`w-full p-2 pl-8 outline-none ${
                                    errors.password
                                        ? "border-2 border-red-600"
                                        : "border-none"
                                } text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50`}
                                placeholder="Password"
                                {...register("password")}
                            />
                        </div>
                        <div className="text-xs h-1 mb-2 text-red-600">
                            {errors.password?.message}
                        </div>
                    </div>
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <BiLockAlt className="absolute left-2 bottom-2.5" />
                            <input
                                type="password"
                                className={`w-full p-2 pl-8 outline-none ${
                                    errors.confirmPassword
                                        ? "border-2 border-red-600"
                                        : "border-none"
                                } text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50`}
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                            />
                        </div>
                        <div className="text-xs h-1 mb-2 text-red-600">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Address
                        </label>
                        <div className="relative">
                            <AiOutlineHome className="absolute left-2 bottom-2.5" />
                            <input
                                type="text"
                                className={`w-full p-2 pl-8 outline-none ${
                                    errors.address
                                        ? "border-2 border-red-600"
                                        : "border-none"
                                } text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50`}
                                placeholder="Address"
                                autoComplete="street-address"
                                {...register("address")}
                            />
                        </div>
                        <div className="text-xs h-1 mb-2 text-red-600">
                            {errors.address?.message}
                        </div>
                    </div>
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Phone Number
                        </label>
                        <div className="relative">
                            <AiOutlinePhone className="absolute left-2 bottom-2.5" />
                            <input
                                type="tel"
                                className={`w-full p-2 pl-8 outline-none ${
                                    errors.mobile
                                        ? "border-2 border-red-600"
                                        : "border-none"
                                } text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50`}
                                placeholder="Phone Number"
                                autoComplete="tel"
                                {...register("mobile")}
                            />
                        </div>
                        <div className="text-xs h-1 mb-2 text-red-600">
                            {errors.mobile?.message}
                        </div>
                    </div>
                    <button
                        className="mt-2 mr-2 py-2 px-4 text-sm bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-[#e1e1e1] rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                        type="submit">
                        Register
                    </button>
                    <button
                        className="mt-2 py-2 px-4 text-sm bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-[#e1e1e1] rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                        onClick={() => reset()}>
                        Reset
                    </button>
                    <button
                        className="absolute bottom-0 right-1 hover:underline text-white opacity-80"
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
