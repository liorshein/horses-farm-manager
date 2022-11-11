import { useFetcher } from "react-router-dom"
import { Horse } from "../../util/types"

type Props = {
    horsesData: Horse[]
    roles: string[]
    searchTerm: string
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setInputs: React.Dispatch<React.SetStateAction<Horse>>
}

const HorsesCards = ({ horsesData, roles, searchTerm, setHidden, setEdit, setInputs }: Props) => {
    const fetcher = useFetcher();

    const setForEdit = (student: Horse) => {
        setHidden(true)
        setInputs(student)
        setEdit(true)
    }

    return (
        <div className='w-full overflow-scroll justify-around flex flex-col lg:flex-row items-center no-scrollbar'>
                {horsesData.filter((horse: Horse) => {
                    if (searchTerm === "") {
                        return horse
                    } else if (horse.horse_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                        return horse
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
                                <fetcher.Form method='delete' action={`/horses?${horse.horse_id}`}>
                                    <button className='my-3 mr-3 px-3 rounded-lg py-1 bg-slate-400'>Delete</button>
                                </fetcher.Form>
                                <button className='my-3 mr-3 px-3 rounded-lg py-1 bg-slate-400' onClick={() => setForEdit(horse)}>Edit</button>
                            </div>}
                    </div>
                })}
        </div>
    )
}

export default HorsesCards