import { useState } from "react";
import Login from "./LoginComp";
import Register from "./RegisterComp";
const horseDrawing = require("../../assets/images/horseDrawing2.png");

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
