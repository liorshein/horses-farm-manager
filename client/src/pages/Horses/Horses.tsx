import { useState } from "react";
import { FaHorseHead } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import {
    useLoaderData,
    ActionFunction,
    LoaderFunction,
} from "react-router-dom";
import { addHorse, deleteHorse, editHorse, getHorses } from "../../api/horses";
import useAuth from "../../hooks/useAuth";
import { Horse } from "../../util/types";
import styles from "./horses.module.scss";
import HorsesCards from "./HorsesCards";
import HorsesForm from "./HorsesForm";

export const loader: LoaderFunction = async () => {
    return getHorses();
};

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST": {
            const formData = await request.formData();
            const horse = Object.fromEntries(formData);
            await addHorse(horse);
            break;
        }

        case "PUT": {
            const formData = await request.formData();
            const horse = Object.fromEntries(formData);
            await editHorse(horse);
            break;
        }

        case "DELETE": {
            const horseId = request.url.split("?")[1];
            await deleteHorse(horseId);
            break;
        }
    }
};

const Horses = () => {
    const { roles } = useAuth()!;
    const horsesData = useLoaderData() as Horse[];

    const [showForm, setShowForm] = useState(false);
    const [inputs, setInputs] = useState<Horse>({
        horse_id: 0,
        horse_name: "",
        age: "",
        breed: "",
        assignable: "True",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [edit, setEdit] = useState(false);

    const shiftComponent = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setShowForm(!showForm);
    };
    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <div className="flex w-full justify-between pb-4">
                <input
                    className="mt-5 sm:ml-10 ml-16 py-1 px-4 placeholder:text-black"
                    type="text"
                    name="search"
                    placeholder="Search horse..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {roles.includes("User") ? null : (
                    <button
                        className="mt-5 text-2xl mr-10"
                        onClick={shiftComponent}
                    >
                        <div className="flex">
                            <BsPlus />
                            <FaHorseHead />
                        </div>
                    </button>
                )}
            </div>
            {showForm ? (
                <HorsesForm
                    inputs={inputs}
                    edit={edit}
                    hidden={showForm}
                    setInputs={setInputs}
                    setEdit={setEdit}
                    setHidden={setShowForm}
                />
            ) : (
                <HorsesCards
                    horsesData={horsesData}
                    roles={roles}
                    searchTerm={searchTerm}
                    setHidden={setShowForm}
                    setEdit={setEdit}
                    setInputs={setInputs}
                />
            )}
        </section>
    );
};

export default Horses;
