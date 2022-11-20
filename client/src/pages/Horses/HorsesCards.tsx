import { Link, useNavigate } from "react-router-dom"
import { deleteHorse } from "../../api/horses"
import { Horse } from "../../util/types"

type Props = {
    horsesData: Horse[]
    roles: string[]
    searchTerm: string
}

const HorsesCards = ({ horsesData, roles, searchTerm }: Props) => {
    const navigate = useNavigate();
    const handleDelete = async (studentId: number) => {
        const response = await deleteHorse(studentId.toString());
        if (response === 200) {
            navigate("/horses");
        }
    };

    return (
        <div className='w-full overflow-scroll justify-around flex flex-col lg:flex-row items-center no-scrollbar'>
            {horsesData.filter((horse: Horse) => {
                if (searchTerm === "") {
                    return horse
                } else if (horse.horse_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                    return horse
                } else {
                    return false
                }
            }).map((horse: Horse) => {
                return <div key={horse.horse_id} className='bg-white my-4 shadow-lg flex flex-col items-center relative mx-5 w-3/4 min-w-fit'>
                    <div className='text-2xl mt-2 font-bold'>{horse.horse_name}</div>
                    <div className='flex flex-col items-center w-full px-4'>
                        <div className='mx-5 mt-3 text-lg'>
                            <label className='font-bold mr-2'>Age:</label>
                            <span>{horse.age}</span>
                        </div>
                        <div className='mx-5 mt-3 text-lg'>
                            <label className='font-bold mr-2'>Breed:</label>
                            <span>{horse.breed}</span>
                        </div>
                        <div className='mx-5 my-3 text-lg'>
                            <label className='font-bold mr-2'>Assignable:</label>
                            <span>{horse.assignable.toString()}</span>
                        </div>
                    </div>
                    {roles.includes("User") ? null :
                        <div className='flex'>
                            <button className='my-3 mr-3 px-3 rounded-lg py-1 bg-slate-400' onClick={(e) =>
                                handleDelete(horse.horse_id)
                            }>Delete</button>
                            <Link
                                to={`/horses/${horse.horse_id}`}
                                className='my-3 mr-3 px-3 rounded-lg py-1 bg-slate-400'
                                state={horse}>
                                Edit
                            </Link>
                        </div>}
                </div>
            })}
        </div>
    )
}

export default HorsesCards