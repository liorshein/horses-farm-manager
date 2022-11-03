import { Instructor } from "../../util/types";
import { AiOutlineInfoCircle } from 'react-icons/ai'

type Props = {
    data: Instructor
}

const PersonalComp = ({ data }: Props) => {

    return (
        <div className='flex-1 shadow-xl flex flex-col justify-start items-start border'>
            <div className="flex items-center text-2xl ml-6 mt-3 font-bold">
                <AiOutlineInfoCircle />
                <h2 className='tracking-tight ml-1 pt-[0.375rem]'>Personal Info</h2>
            </div>
            <div className='text-xl mx-5 mt-3 font-medium whitespace-nowrap'>Email: {data.email}</div>
            <div className='text-xl mx-5 mt-3 font-medium whitespace-nowrap'>Address: {data.address}</div>
            <div className='text-xl mx-5 mt-3 font-medium whitespace-nowrap'>Phone number: {data.phone_number}</div>
        </div>
    )
}

export default PersonalComp