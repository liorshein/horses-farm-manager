import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

type Props = {
    switchPage: (a: string) => void;
};

const Login = (props: Props) => {
    const { onLogin, loginValues, onChange, onLoginTest } = useAuth()!;

    return (
        <div className="h-screen w-screen flex content-center items-center justify-center bg-loginImage bg-cover bg-no-repeat">
            <div
                className="relative bg-[#686d6f7a] py-9 px-10 rounded z-[1] overflow-hidden shadow-2xl animate-[login_0.88s_ease]
            after:absolute after:top-0 after:left-0 after:h-full after:bg-loginImage after:w-full after:-z-[1] after:bg-[length:182vh] after:bg-[position:28%,_83%] after:blur-xl after:bg-no-repeat after:opacity-80">
                <h1 className="text-4xl font-normal text-center mb-4 text-white tracking-tight">
                    Login to your account
                </h1>
                <form autoComplete="off">
                    <div className="block mb-3 mt-2">
                        <label className="block mb-1 text-sm text-white">
                            Email
                        </label>
                        <div className="relative">
                            <AiOutlineUser className="absolute left-2 bottom-2.5" />
                            <input
                                type="text"
                                className="w-full p-2 pl-8 outline-none border-none text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50"
                                name="email"
                                id="email"
                                placeholder="Email"
                                autoComplete="email"
                                value={loginValues.email}
                                onChange={onChange}
                            />
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
                                className="w-full p-2 pl-8 outline-none border-none text-sm rounded bg-[#0000002b] text-white transition-[all_0.2s_ease-in-out] hover:bg-[#b99f83] focus:bg-[#927e68] focus:shadow-[0px_2px_2px_#0000002b,_0px_5px_10px_#00000036] placeholder:text-white placeholder:opacity-50"
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={loginValues.password}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <button
                        className="mt-2 mr-2 py-2 px-4 text-sm bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-[#e1e1e1] rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                        onClick={onLogin}>
                        Login
                    </button>
                    <button
                        className="mt-2 mr-2 py-2 px-4 text-sm bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-[#e1e1e1] rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                        onClick={(e) => onLoginTest(e, 1)}>
                        Admin
                    </button>
                    <button
                        className="mt-2 py-2 px-4 text-sm bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-[#e1e1e1] rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                        onClick={(e) => onLoginTest(e, 2)}>
                        User
                    </button>
                    <button
                        className="absolute bottom-0 right-1 hover:underline text-white opacity-80"
                        type="button"
                        onClick={() => props.switchPage("Register")}>
                        Not a member? Sign In!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
