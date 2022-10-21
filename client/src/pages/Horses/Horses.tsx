import { useState } from 'react'
import { useLoaderData, ActionFunction, LoaderFunction } from 'react-router-dom'
import { addHorse, deleteHorse, editHorse, getHorses } from '../../api/horses'
import useAuth from '../../hooks/useAuth'
import { Horse } from '../../util/types'
import styles from "./horses.module.scss"
import HorsesCards from './HorsesCards'
import HorsesForm from './HorsesForm'

export const loader: LoaderFunction = async () => {
  return getHorses();
}

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const horse = Object.fromEntries(formData);
      await addHorse(horse);
      break;
    }

    case "PUT": {
      const formData = await request.formData();
      const horse = Object.fromEntries(formData);
      await editHorse(horse);
      break;
    }

    case "DELETE": {
      const horseId = request.url.split("?")[1];
      await deleteHorse(horseId);
      break;
    }
  }
}

const Horses = () => {
  const { roles } = useAuth()!
  const horsesData = useLoaderData() as Horse[]

  const [hidden, setHidden] = useState(true)
  const [inputs, setInputs] = useState<Horse>({
    horse_id: 0,
    horse_name: '',
    age: '',
    breed: '',
    assignable: 'True',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [edit, setEdit] = useState(false)

  return (
    <div className={styles.main_container}>
      <div className={styles.form_content}>
        {roles.includes("User") ? <div className={styles.emptyDiv}></div> :
          <HorsesForm
            inputs={inputs}
            edit={edit}
            hidden={hidden}
            setInputs={setInputs}
            setEdit={setEdit}
            setHidden={setHidden} />
        }
        <input className={styles.search}
          type="text"
          name="search"
          placeholder='Search horse...'
          onChange={(e) => setSearchTerm(e.target.value)} />
        <HorsesCards
          horsesData={horsesData}
          roles={roles}
          searchTerm={searchTerm}
          setHidden={setHidden}
          setEdit={setEdit}
          setInputs={setInputs} />
      </div>
    </div>
  );
}

export default Horses