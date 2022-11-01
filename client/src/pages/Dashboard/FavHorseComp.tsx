import { HorseData } from "../../util/types";
import { GiHorseshoe } from 'react-icons/gi'

type Props = {
    data: HorseData
}

const FavHorseComp = ({ data }: Props) => {
    return (
        <div className='flex-1 shadow-xl flex flex-col justify-start items-start border'>
            <div className="flex items-center text-2xl ml-6 mt-3 font-bold">
                <GiHorseshoe />
                <h2 className='tracking-tight ml-1 pt-[0.375rem]'>Favorite Horse</h2>
            </div>
            <h3 className='self-center mt-10 text-6xl'>{data?.horse_name}</h3>
        </div>
    )
}

export default FavHorseComp