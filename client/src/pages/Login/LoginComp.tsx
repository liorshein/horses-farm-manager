import useAuth from "../../hooks/useAuth";

type Props = {
    switchPage: (a: string) => void;
};

const Login = (props: Props) => {
    const { onLogin, loginValues, onChange, onLoginTest } = useAuth()!;

    return (
        <div className="w-full h-full flex justify-center items-center mb-20 sm:mb-0">
            <div className="w-full mx-10">
                <h1 className="text-4xl mb-5 tracking-tight">Welcome</h1>
                <form autoComplete="off">
                    <div className="flex flex-col mb-4">
                        <label className="font-semibold mb-1">Email</label>
                        <input
                            className="text-lg"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={loginValues.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="font-semibold mb-1">
                            Password
                        </label>
                        <input
                            className="text-lg"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={loginValues.password}
                            onChange={onChange}
                        />
                    </div>
                    <button className="bg-slate-500 py-1 px-3 rounded-lg mr-1" onClick={onLogin}>Login</button>
                    <button className="bg-slate-500 py-1 px-3 rounded-lg mr-1" onClick={(e) => onLoginTest(e, 1)}>Admin</button>
                    <button className="bg-slate-500 py-1 px-3 rounded-lg" onClick={(e) => onLoginTest(e, 2)}>User</button>
                    <button
                        className='absolute bottom-4 right-4 hover:underline'
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
