import { useFetcher } from "react-router-dom";
import { Instructor, Student } from "../../util/types";

type Props = {
    instructorsData: Instructor[];
    edit: boolean;
    hidden: boolean;
    inputs: Student;
    setInputs: React.Dispatch<React.SetStateAction<Student>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentsForm = ({
    instructorsData,
    edit,
    setEdit,
    hidden,
    setHidden,
    inputs,
    setInputs,
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
                    New Student
                </h2>
                <input
                    className="hidden"
                    type="number"
                    name="student_id"
                    id="student_id"
                    value={inputs.student_id}
                    onChange={handleChange}
                />
                <div className="flex flex-col sm:flex-row mx-2 w-full flex-wrap justify-center">
                    <div className="sm:mx-2 max-sm:w-full">
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Name</label>
                            <input
                                type="text"
                                name="student_name"
                                id="name"
                                value={inputs.student_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">ID</label>
                            <input
                                type="number"
                                name="id"
                                id="id"
                                value={inputs.id}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Date of birth</label>
                            <input
                                type="text"
                                name="date_of_birth"
                                id="date_of_birth"
                                value={inputs.date_of_birth}
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
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Weight</label>
                            <input
                                type="number"
                                name="weight"
                                id="weight"
                                value={inputs.weight}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="sm:mx-2 max-sm:w-full">
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Height</label>
                            <input
                                type="number"
                                name="height"
                                id="height"
                                value={inputs.height}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={inputs.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">
                                Educational framework
                            </label>
                            <input
                                type="text"
                                name="framework"
                                id="framework"
                                value={inputs.framework}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Working on</label>
                            <input
                                type="text"
                                name="working_on"
                                id="working_on"
                                value={inputs.working_on}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">HMO</label>
                            <select
                                name="hmo"
                                id="hmo"
                                value={inputs.hmo}
                                className="py-[0.20rem]"
                                onChange={handleChange}
                            >
                                <option value="">Choose HMO</option>
                                <option value="0">Macabi</option>
                                <option value="1">Clalit</option>
                                <option value="2">Meuhedet</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="sm:mx-2 max-sm:w-full">
                    <div className="mb-2 flex flex-col">
                        <select
                            name="instructor_id"
                            id="instructor_id"
                            className="py-[0.20rem] my-2"
                            value={inputs.instructor_id}
                            onChange={handleChange}
                        >
                            <option>Assign Instructor</option>
                            {instructorsData.map((instructor: Instructor) => {
                                return (
                                    <option
                                        key={instructor.instructor_id}
                                        value={instructor.instructor_id}
                                    >
                                        {instructor.instructor_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex justify-around mb-4">
                    {!edit ? (
                        <button className="px-2 py-1 bg-slate-300 rounded-lg mt-2 mx-1">
                            Add Student
                        </button>
                    ) : (
                        <button className="px-2 py-1 bg-slate-300 rounded-lg mt-2 mx-1">
                            Update Student
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
    student_id: 0,
    student_name: "",
    id: "",
    date_of_birth: "",
    age: "",
    weight: "",
    height: "",
    hmo: "",
    address: "",
    framework: "",
    working_on: "",
    instructor_id: 0,
    instructor_name: "",
};

export default StudentsForm;
