import { useFetcher } from "react-router-dom";
import { Horse } from "../../util/types";
import styles from "./horses.module.scss";

type Props = {
    edit: boolean;
    hidden: boolean;
    inputs: Horse;
    setInputs: React.Dispatch<React.SetStateAction<Horse>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const HorsesForm = ({
    edit,
    hidden,
    inputs,
    setInputs,
    setEdit,
    setHidden,
}: Props) => {
    const fetcher = useFetcher();

    const handleChange = (event: {
        target: { name: string; value: string };
    }) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const shiftStateForm = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (hidden === true) {
            setHidden(false);
        } else {
            setHidden(true);
        }
        setEdit(false);
        setInputs(cleanForm);
    };

    return (
        <div className="w-full flex justify-center">
            <fetcher.Form
                method={edit ? "put" : "post"}
                className="flex w-3/5 flex-col items-center mt-3 bg-slate-200 shadow-lg px-5"
            >
                <h2 className="text-2xl my-2 underline tracking-tight">
                    Add Horse
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
                                className="py-[0.20rem]"
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
                            className="px-2 py-1 bg-slate-300 rounded-lg mt-2 mx-1"
                            onClick={() => setHidden(true)}
                        >
                            Add Horse
                        </button>
                    ) : (
                        <button className="px-2 py-1 bg-slate-300 rounded-lg mt-2 mx-1">
                            Update Horse
                        </button>
                    )}
                    <button
                        className="px-2 py-1 bg-slate-300 rounded-lg mt-2 mx-1"
                        onClick={shiftStateForm}
                    >
                        Return
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
};

const cleanForm = {
    horse_id: 0,
    horse_name: "",
    age: "",
    breed: "",
    assignable: "True",
};

export default HorsesForm;
