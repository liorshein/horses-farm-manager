import { useState } from "react";
import Login from "./LoginComp";
import Register from "./RegisterComp";

const Home = () => {
    const [switchPage, setSwitchPage] = useState("Login");

    return (
        <>
            {switchPage === "Login" ? (
                <Login switchPage={setSwitchPage} />
            ) : (
                <Register switchPage={setSwitchPage} />
            )}
        </>
    );
};

export default Home;
