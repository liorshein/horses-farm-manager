import { Suspense, useState } from "react";
import { FaHorseHead } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import {
    useLoaderData,
    ActionFunction,
    LoaderFunction,
    defer,
    Await,
} from "react-router-dom";
import { addHorse, deleteHorse, editHorse, getHorses } from "../../api/horses";
import useAuth from "../../hooks/useAuth";
import { Horse } from "../../util/types";
import HorsesCards from "./HorsesCards";
import HorsesForm from "./HorsesForm";
import Loader from "../../components/Loader";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getHorses() });
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
    const loaderData = useLoaderData() as any;

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
                    className="mt-5 sm:ml-10 ml-12 py-1 px-4 placeholder:text-black"
                    type="text"
                    name="search"
                    placeholder="Search horse..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {roles.includes("User") ? null : (
                    <button
                        className="mt-5 text-2xl mr-5 sm:mr-10"
                        onClick={shiftComponent}>
                        <div className="flex">
                            <BsPlus />
                            <FaHorseHead />
                        </div>
                    </button>
                )}
            </div>
            <Suspense fallback={<Loader />}>
                <Await
                    resolve={loaderData.myData}
                    errorElement={<p>Error loading horses!</p>}>
                    {(loadedHorses) => (
                        <>
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
                                    horsesData={loadedHorses}
                                    roles={roles}
                                    searchTerm={searchTerm}
                                    setHidden={setShowForm}
                                    setEdit={setEdit}
                                    setInputs={setInputs}
                                />
                            )}
                        </>
                    )}
                </Await>
            </Suspense>
        </section>
    );
};

export default Horses;
