import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import Navigation from '../../components/Navigation/Navigation'
import UserService from '../../services/userService'
import styles from "./horses.module.scss"
const logo = require("../../assets/icons/logo.svg")
const menuIcon = require("../../assets/icons/menu.svg").default

// TODO (1): Decide what to show on horses page (Healthy horses that can work, nonassignable horses...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

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
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth)
  const [navDisplay, setNavDisplay] = useState(true)

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const getData = async () => {
      const personalData = await UserService.getPersonalInfo()
      setPersonalInfo(personalData)
      const horsesData = await UserService.getHorsesInfo()
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
      UserService.addHorse(inputs.horse_name, Number(inputs.age), inputs.breed, inputs.assignable)
    } else {
      alert("Please enter valid info!")
    }

  }

  const deleteHorse = (id: number) => {
    UserService.deleteHorse(id.toString())
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
            <h2>Add Horse</h2>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="horse_name" id="name" value={inputs.horse_name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Breed</label>
              <input type="text" name="breed" id="breed" value={inputs.breed} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Assignable?</label>
              <select name="assignable" id="assignable" value={inputs.assignable as string} onChange={handleChange}>
                <option>True</option>
                <option>False</option>
              </select>
            </div>
            <button onClick={addHorse}>Add Horse</button>
            <button onClick={shiftStateForm}>Return</button>
          </form>
          <button className={styles.addBtn} onClick={shiftStateForm}>Add Horse</button>
          <div className={styles.flexRow}>
            {horsesInfo.map((horse: Horse) => {
              return <div key={horse.horse_id} className={styles.horse_container}>
                <div className={styles.name}>{horse.horse_name}</div>
                <div className={styles.container}>
                  <div>
                    <label className={styles.label}>Age:</label>
                    <span>{horse.age}</span>
                  </div>
                  <div>
                    <label className={styles.label}>Breed:</label>
                    <span>{horse.breed}</span>
                  </div>
                  <div>
                    <label className={styles.label}>Assignable:</label>
                    <span>{horse.assignable.toString()}</span>
                  </div>
                </div>
                <button className={styles.deleteBtn} onClick={() => deleteHorse(horse.horse_id)}>Delete</button>
              </div>
            })}
          </div>
        </div>
      </div>}
    </>
  );
}

export default Horses