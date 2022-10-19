import { useState } from 'react'
import { useLoaderData, ActionFunction, useFetcher } from 'react-router-dom'
import { addHorse, deleteHorse, editHorse, getHorses } from '../../api/horses'
import useAuth from '../../hooks/useAuth'
import styles from "./horses.module.scss"

export type Horse = {
  horse_id: number
  horse_name: string
  age: string
  breed: string
  assignable: boolean | string
}

export const loader = async () => {
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
  const fetcher = useFetcher();
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

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const shiftStateForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (hidden === true) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }

  const setForEdit = (horse: Horse) => {
    setHidden(false)
    setInputs(horse)
    setEdit(true)
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.form_content}>
        {roles.includes("User") ? <div className={styles.emptyDiv}></div> : <>
          <fetcher.Form method={edit ? 'put' : 'post'} className={hidden ? styles.hidden : styles.form}>
            <h2 className={styles.title}>Add Horse</h2>
            <input className={styles.hidden} type="number" name="horse_id" id="horse_id" value={inputs.horse_id} onChange={handleChange} />
            <div className={styles.form_group}>
              <label>Name</label>
              <input type="text" name="horse_name" id="name" value={inputs.horse_name} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Age</label>
              <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Breed</label>
              <input type="text" name="breed" id="breed" value={inputs.breed} onChange={handleChange} />
            </div>
            <div className={styles.form_select}>
              <label>Assignable?</label>
              <select name="assignable" id="assignable" value={inputs.assignable as string} onChange={handleChange}>
                <option>True</option>
                <option>False</option>
              </select>
            </div>
            <div className={styles.flex}>
              {!edit ? <button type="submit" className={styles.Btns}>Add Horse</button>
                : <button className={styles.Btns}>Update Horse</button>}
              <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
            </div>
          </fetcher.Form>
          <button className={styles.addBtn} onClick={shiftStateForm}>Add Horse</button>
        </>
        }
        <input className={styles.search} type="text" name="search" placeholder='Search horse...' onChange={(e) => setSearchTerm(e.target.value)} />
        <div className={styles.flexRow}>
          <div className={styles.wrapper}>
            {horsesData.filter((horse: Horse) => {
              if (searchTerm === "") {
                return horse
              } else if (horse.horse_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                return horse
              }
            }).map((horse: Horse) => {
              return <div key={horse.horse_id} className={styles.horse_container}>
                <div className={styles.name}>{horse.horse_name}</div>
                <div className={styles.container}>
                  <div className={styles.info}>
                    <label className={styles.label}>Age:</label>
                    <span>{horse.age}</span>
                  </div>
                  <div className={styles.info}>
                    <label className={styles.label}>Breed:</label>
                    <span>{horse.breed}</span>
                  </div>
                  <div className={styles.info}>
                    <label className={styles.label}>Assignable:</label>
                    <span>{horse.assignable.toString()}</span>
                  </div>
                </div>
                {roles.includes("User") ? <></> :
                  <div className={styles.btn_div}>
                    <fetcher.Form method='delete' action={`/horses?${horse.horse_id}`}>
                      <button className={styles.horseBtn}>Delete</button>
                    </fetcher.Form>
                    <button className={styles.horseBtn} onClick={() => setForEdit(horse)}>Edit</button>
                  </div>}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Horses