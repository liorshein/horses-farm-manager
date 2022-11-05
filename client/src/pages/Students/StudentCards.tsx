import { useFetcher } from "react-router-dom"
import { Student } from "../../util/types"
const clalit = require("../../assets/icons/clalit.svg").default
const meuhedet = require("../../assets/icons/meuhedet.svg").default
const macabi = require("../../assets/icons/macabi.svg").default

type Props = {
    studentsData: Student[]
    roles: string[]
    searchTerm: string
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setInputs: React.Dispatch<React.SetStateAction<Student>>
}

const hmoNames = [clalit, macabi, meuhedet]

const StudentCards = ({ studentsData, roles, searchTerm, setHidden, setEdit, setInputs }: Props) => {
    const fetcher = useFetcher();

    const setForEdit = (student: Student) => {
        setHidden(true)
        setInputs(student)
        setEdit(true)
    }

    return (
        <div className='w-full overflow-scroll flex flex-col items-center no-scrollbar'>
            {studentsData.filter((student: Student) => {
                if (searchTerm === "") {
                    return student
                } else if (student.student_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                    return student
                }
            }).map((student: Student) => {
                return <div key={student.student_id} className='bg-white my-4 shadow-lg flex flex-col items-center relative mx-6 w-3/4 min-w-fit'>
                    <div className='text-2xl mt-2 font-bold'>{student.student_name}</div>
                    <div className='flex flex-col sm:flex-row justify-between w-full px-4'>
                        <div className='mx-5 mt-3 text-lg'>
                            <div className='mb-4'>
                                <label className='font-bold'>ID</label>
                                <div>{student.id}</div>
                            </div>
                            <div className='mb-4'>
                                <label className='font-bold'>Date of birth</label>
                                <div>{student.date_of_birth}</div>
                            </div>
                            <div className='mb-4'>
                                <label className='font-bold'>Age</label>
                                <div>{student.age}</div>
                            </div>
                        </div>
                        <div className='mx-5 mt-3 text-lg'>
                            <div className='mb-4'>
                                <label className='font-bold'>Weight</label>
                                <div>{student.weight}</div>
                            </div>
                            <div className='mb-4'>
                                <label className='font-bold'>Height</label>
                                <div>{student.height}</div>
                            </div>
                            <div className='mb-4'>
                                <label className='font-bold'>Address</label>
                                <div>{student.address}</div>
                            </div>
                        </div>
                        <div className='mx-5 mt-3 text-lg'>
                            <div className='mb-4'>
                                <label className='font-bold'>Educational framework</label>
                                <div>{student.framework}</div>
                            </div>
                            <div className='mb-4'>
                                <label className='font-bold'>Working on</label>
                                <div>{student.working_on}</div>
                            </div>
                            {!roles.includes("User") ? <div className='mb-4'>
                                <label className='font-bold'>Instructor</label>
                                <div>{student.instructor_name}</div>
                            </div> : <></>}
                        </div>
                    </div>
                    <img className='absolute right-3 top-14 sm:top-3' src={hmoNames[student.hmo as number]} alt={hmoNames[student.hmo as number].toString()} />
                    {roles.includes("User") ? null :
                        <div className='flex'>
                            <fetcher.Form method='delete' action={`/students?${student.student_id}`}>
                                <button className='my-3 mr-3 px-3 rounded-lg py-1 bg-slate-400'>Delete</button>
                            </fetcher.Form>
                            <button className='my-3 mr-3 px-3 rounded-lg py-1 bg-slate-400' onClick={() => setForEdit(student)}>Edit</button>
                        </div>}
                </div>
            })}
        </div>
    )
}

export default StudentCards