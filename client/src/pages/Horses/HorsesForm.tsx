import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addHorse, editHorse } from "../../api/horses";
import { Horse } from "../../util/types";

const HorsesForm = () => {
    const navigate = useNavigate()
    const inputData = useLocation().state;

    const [inputs, setInputs] = useState<Horse>({
        horse_id: 0,
        horse_name: "",
        age: "",
        breed: "",
        assignable: "True",
    });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (inputData) {
                setInputs(inputData);
                setEdit(true);
            }
        };
        getData();
    }, [inputData]);

    const handleChange = (event: {
        target: { name: string; value: string };
    }) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleAdd = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await addHorse(inputs)
        if (response === 200) {
            navigate("/horses")
        }
    }

    const handleUpdate = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await editHorse(inputs)

        if (response === 200) {
            navigate("/horses")
        }
    }

    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <div className="w-full mt-10 flex justify-center">
                <form autoComplete="off" className="flex w-3/5 flex-col items-center mt-3 bg-primary shadow-lg px-5 rounded-lg">
                    <h2 className="text-2xl my-2 underline tracking-tight">
                        Horse Form
                    </h2>
                    <input
                        className="hidden"
                        type="number"
                        name="horse_id"
                        id="horse_id"
                        value={inputs.horse_id}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col sm:flex-row mx-2 w-full flex-wrap justify-center">
                        <div className="sm:mx-2 max-sm:w-full">
                            <div className="mb-2 flex flex-col w-full">
                                <label className="mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="....."
                                    className="rounded pl-1"
                                    name="horse_name"
                                    id="name"
                                    value={inputs.horse_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-2 flex flex-col">
                                <label className="mb-1">Age</label>
                                <input
                                    type="number"
                                    min={1}
                                    placeholder="....."
                                    className="rounded pl-1"
                                    name="age"
                                    id="age"
                                    value={inputs.age}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="sm:mx-2 max-sm:w-full">
                            <div className="mb-2 flex flex-col">
                                <label className="mb-1">Breed</label>
                                <input
                                    type="text"
                                    className="rounded pl-1"
                                    placeholder="....."
                                    name="breed"
                                    id="breed"
                                    value={inputs.breed}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-2 flex flex-col">
                                <label className="mb-1">Assignable?</label>
                                <select
                                    name="assignable"
                                    id="assignable"
                                    className="rounded"
                                    value={inputs.assignable as string}
                                    onChange={handleChange}
                                >
                                    <option>True</option>
                                    <option>False</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around mb-4">
                        {!edit ? (
                            <button
                                type="submit"
                                className="px-2 py-1 mt-2 mx-1 bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                                onClick={handleAdd}
                            >
                                Add
                            </button>
                        ) : (
                            <button className="px-2 py-1 mt-2 mx-1 bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]" onClick={handleUpdate}>
                                Update
                            </button>
                        )}
                        <Link
                            to="/horses"
                            className="px-2 py-1 mt-2 mx-1 bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                        >
                            Return
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default HorsesForm;
