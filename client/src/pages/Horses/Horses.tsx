import { Suspense, useState } from "react";
import { FaHorseHead } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import {
    useLoaderData,
    LoaderFunction,
    defer,
    Await,
    Link,
} from "react-router-dom";
import { getHorses } from "../../api/horses";
import useAuth from "../../hooks/useAuth";
import HorsesCards from "./HorsesCards";
import Loader from "../../components/Loader";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getHorses() });
};

const Horses = () => {
    const { roles } = useAuth()!;
    const loaderData = useLoaderData() as any;
    const [searchTerm, setSearchTerm] = useState("");

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
                    <Link
                        to="/horses/new"
                        className="mt-5 text-2xl mr-5 sm:mr-10">
                        <div className="flex">
                            <BsPlus />
                            <FaHorseHead />
                        </div>
                    </Link>
                )}
            </div>
            <Suspense fallback={<Loader />}>
                <Await
                    resolve={loaderData.myData}
                    errorElement={<p>Error loading horses!</p>}>
                    {(loadedHorses) => (
                        <>
                            {
                                <HorsesCards
                                    horsesData={loadedHorses}
                                    roles={roles}
                                    searchTerm={searchTerm}
                                />
                            }
                        </>
                    )}
                </Await>
            </Suspense>
        </section>
    );
};

export default Horses;
