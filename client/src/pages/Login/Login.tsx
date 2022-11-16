import { useState } from "react";
import Login from "./LoginComp";
import Register from "./RegisterComp";
const horseDrawing = require('../../assets/images/horseDrawing2.png')

const Home = () => {
    const [switchPage, setSwitchPage] = useState("Login");

    return (
        <div className="w-screen h-screen flex justify-center items-center p-5">
            <div className="relative h-full w-full max-w-3xl rounded-3xl flex flex-col sm:flex-row items-center justify-between bg-slate-100 max-sm:overflow-y-auto max-sm:no-scrollbar">
              <img className="h-40 sm:h-60 mt-4 sm:mx-10" src={horseDrawing} alt="Horse" />
              {switchPage === "Login" ? <Login switchPage={setSwitchPage} /> : <Register switchPage={setSwitchPage} />}
            </div>
        </div>
    );
};

export default Home;
