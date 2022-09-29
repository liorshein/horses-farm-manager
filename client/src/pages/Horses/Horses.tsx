import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Loader from '../../components/Loader/Loader'
import Navigation from '../../components/Navigation/Navigation'
import styles from "./horses.module.scss"
const logo = require("../../assets/icons/logo.svg")
const menuIcon = require("../../assets/icons/menu.svg").default

type Props = {}

type Horse = {
  horse_id: number
  horse_name: string
  age: string
  breed: string
  assignable: boolean | string
}

const Horses = (props: Props) => {
  const [horsesInfo, setHorsesInfo] = useState<Horse[]>([]);
  const [hidden, setHidden] = useState(true)
  const [inputs, setInputs] = useState<Horse>({
    horse_id: 0,
    horse_name: '',
    age: '',
    breed: '',
    assignable: 'True',
  })
  const [personalInfo, setPersonalInfo] = useState({
    instructor_name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth)
  const [navDisplay, setNavDisplay] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if (width <= 1000) {
      setNavDisplay(false)
    } else {
      setNavDisplay(true)
    }
  }, [width]);

  const shiftMenuDisplay = () => {
    if (navDisplay) {
      setNavDisplay(false)
    } else {
      setNavDisplay(true)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const getData = async () => {
      const personalData = await (await axiosPrivate.get("/instructors/user")).data.result
      setPersonalInfo(personalData)
      const horsesData = await (await axiosPrivate.get("/instructors/horses")).data.result
      setHorsesInfo(horsesData)
    }
    getData()
  }, [])

  const shiftStateForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (hidden === true) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }

  const addHorse = async () => {
    if (inputs.age !== '' && inputs.assignable !== '' && inputs.breed !== '' && inputs.horse_name) {
      if (inputs.assignable === "True") {
        inputs.assignable = true
      } else {
        inputs.assignable = false
      }
      axiosPrivate.post("/instructors/add-horse", {
        name: inputs.horse_name,
        age: Number(inputs.age),
        breed: inputs.breed,
        assignable: inputs.assignable
      })

    } else {
      alert("Please enter valid info!")
    }

  }

  const deleteHorse = (id: number) => {
    let params = new URLSearchParams({ horse_id: id.toString() })
    axiosPrivate.delete(`/instructors/delete-horse?${params}`)
    setHorsesInfo(() => {
      return horsesInfo.filter(horse => horse.horse_id !== id)
    })
  }  

  return (
    <> {loading ? < Loader /> :
      <div className={styles.main_container}>
        <div className={styles.menu_side} onClick={shiftMenuDisplay}>
          <img src={menuIcon} alt="logo" />
        </div>
        <nav className={navDisplay ? styles.navbar : styles.menu_hidden}>
          <div className={styles.menu} onClick={shiftMenuDisplay}>
            <img src={menuIcon} alt="logo" />
          </div>
          <div className={styles.logo}>
            <img src={logo.default} alt="logo" />
          </div>
          <div className={styles.personal_info_nav}>
            <h1 className={styles.name}>{personalInfo.instructor_name.split(' ')[0]} <br /> {personalInfo.instructor_name.split(' ')[1]}</h1>
            <p className={styles.job}>Instructor</p>
          </div>
          <div className={styles.links}>
            <Navigation />
          </div>
        </nav>
        <div className={styles.form_content}>
          <form className={hidden ? styles.hidden : styles.form}>
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
              <button className={styles.Btns} onClick={addHorse}>Add Horse</button>
              <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
            </div>
          </form>
          <button className={styles.addBtn} onClick={shiftStateForm}>Add Horse</button>
          <input className={styles.search} type="text" name="search" placeholder='Search horse...' onChange={(e) => setSearchTerm(e.target.value)} />
          <div className={styles.flexRow}>
            <div className={styles.wrapper}>
              {horsesInfo.filter((horse: Horse) => {
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
                  <button className={styles.deleteBtn} onClick={() => deleteHorse(horse.horse_id)}>Delete</button>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

export default Horses