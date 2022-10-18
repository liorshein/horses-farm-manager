import { useState } from 'react'
import styles from "./horses.module.scss"
import { useLoaderData, Form, ActionFunction } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { axiosPrivate } from '../../api/axios'
import { addHorse, getHorses } from '../../api/horses'

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
    case "post": {
      const formData = await request.formData();
      const horse = Object.fromEntries(formData)
      await addHorse(horse)
    }
  }
}

const Horses = () => {
  const { roles } = useAuth()!
  const horsesData = useLoaderData() as Horse[]
  const [horsesInfo, setHorsesInfo] = useState<Horse[]>([]);
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

    if (horse.assignable === true) {
      horse.assignable = "True"
    } else {
      horse.assignable = "False"
    }
    setInputs(horse)
    setEdit(true)
  }

  const updateHorse = async (e: any) => {
    e.preventDefault()
    if (inputs.age !== '' && inputs.assignable !== '' && inputs.breed !== '' && inputs.horse_name) {
      if (inputs.assignable === "True") {
        inputs.assignable = true
      } else {
        inputs.assignable = false
      }

      await axiosPrivate.put("/admin/edit-horse", {
        name: inputs.horse_name,
        age: Number(inputs.age),
        breed: inputs.breed,
        assignable: inputs.assignable,
        horse_id: inputs.horse_id
      })

      const horsesData = await (await axiosPrivate.get("/instructors/horses")).data.result
      setHorsesInfo(horsesData.sort((a: Horse, b: Horse) => (a.horse_id > b.horse_id ? 1 : -1)))

    } else {
      alert("Please enter valid info!")
    }
  }

  const deleteHorse = (id: number) => {
    let params = new URLSearchParams({ horse_id: id.toString() })
    axiosPrivate.delete(`/admin/delete-horse?${params}`)
    setHorsesInfo(() => {
      return horsesInfo.filter(horse => horse.horse_id !== id)
    })
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.form_content}>
        {roles.includes("User") ? <div className={styles.emptyDiv}></div> : <>
          <Form method='post' className={hidden ? styles.hidden : styles.form}>
            <h2 className={styles.title}>Add Horse</h2>
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
                : <button className={styles.Btns} onClick={updateHorse}>Update Horse</button>}
              <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
            </div>
          </Form>
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
                    <button className={styles.horseBtn} onClick={() => deleteHorse(horse.horse_id)}>Delete</button>
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