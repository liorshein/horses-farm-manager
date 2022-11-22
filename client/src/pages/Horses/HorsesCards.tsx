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
        <div className='w-full overflow-scroll flex flex-col lg:flex-row items-center content-start gap-0 no-scrollbar lg:flex-wrap lg:justify-center lg:flex-grow'>
            {horsesData.filter((horse: Horse) => {
                if (searchTerm === "") {
                    return horse
                } else if (horse.horse_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                    return horse
                } else {
                    return false
                }
            }).map((horse: Horse) => {
                return <div key={horse.horse_id} className='bg-white my-4 shadow-lg flex flex-col items-center relative mx-5 w-3/4 lg:w-1/4 min-w-fit lg:flex-1'>
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
                            <button className='my-3 mr-3 px-3 py-1 bg-primary border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]' onClick={(e) =>
                                handleDelete(horse.horse_id)
                            }>Delete</button>
                            <Link
                                to={`/horses/${horse.horse_id}`}
                                className='my-3 mr-3 px-3 py-1 bg-primary border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]'
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