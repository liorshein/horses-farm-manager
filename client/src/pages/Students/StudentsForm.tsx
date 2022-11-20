import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addStudent, editStudent, getInstructors } from "../../api/students";
import { Instructor, Student } from "../../util/types";

const StudentsForm = () => {
    const navigate = useNavigate()
    const inputData = useLocation().state;
    const [inputs, setInputs] = useState<Student>({
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
    });
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (inputData) {
                setInputs(inputData);
                setEdit(true);
            }
            const response = await getInstructors();
            setInstructors(response);
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
        const response = await addStudent(inputs)
        if (response === 200) {
            navigate("/students")
        }
    }

    const handleUpdate = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await editStudent(inputs)
        console.log(response);

        if (response === 200) {
            navigate("/students")
        }
    }

    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <div className="w-full flex justify-center">
                <form
                    autoComplete="off"
                    className="flex w-3/5 flex-col items-center mt-3 bg-primary shadow-lg px-5 rounded-lg">
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded pl-2"
                                    placeholder="....."
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
                                    className="rounded"
                                    onChange={handleChange}>
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
                                className="rounded mt-3 mb-1"
                                value={inputs.instructor_id}
                                onChange={handleChange}>
                                <option>Assign Instructor</option>
                                {instructors.map((instructor: Instructor) => {
                                    return (
                                        <option
                                            key={instructor.instructor_id}
                                            value={instructor.instructor_id}>
                                            {instructor.instructor_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-around mb-4">
                        {!edit ? (
                            <button className="px-2 py-1 mt-2 mx-1 bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]" onClick={handleAdd}>
                                Add Student
                            </button>
                        ) : (
                            <button className="px-2 py-1 mt-2 mx-1 bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]" onClick={handleUpdate}>
                                Update Student
                            </button>
                        )}
                        <Link
                            to="/students"
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

export default StudentsForm;
