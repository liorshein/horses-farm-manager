import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import Navigation from '../../components/Navigation/Navigation'
import UserService from '../../services/userService'
import styles from "./students.module.scss"
const logo = require("../../assets/icons/logo.svg")
const clalit = require("../../assets/icons/clalit.svg")
const meuhedet = require("../../assets/icons/meuhedet.svg")
const macabi = require("../../assets/icons/macabi.svg")
const menuIcon = require("../../assets/icons/menu.svg").default


// TODO (1): Decide what to show on students page (All students of the user, what data to show...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

type Props = {}

export type Student = {
  student_id: number
  student_name: string
  id: string
  date_of_birth: string
  age: string
  weight: string
  height: string
  hmo: number | string
  address: string
  framework: string
  working_on: string
}

const hmoNames = [clalit, macabi, meuhedet]

const Students = (props: Props) => {
  const [studentsInfo, setStudentsInfo] = useState<Student[]>([]);
  const [hidden, setHidden] = useState(true)
  const [inputs, setInputs] = useState<Student>({
    student_id: 0,
    student_name: '',
    id: '',
    date_of_birth: '',
    age: '',
    weight: '',
    height: '',
    hmo: '',
    address: '',
    framework: '',
    working_on: '',
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
  const [searchTerm, setSearchTerm] = useState('')

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
      const studentsData = await UserService.getUserStudentsInfo()
      setStudentsInfo(studentsData)
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

  const addStudent = () => {
    if (inputs.address !== '' && inputs.age !== '' && inputs.date_of_birth !== '' && inputs.framework !== '' &&
      inputs.height !== '' && inputs.hmo !== '' && inputs.id !== '' && inputs.student_name !== '' &&
      inputs.weight !== '' && inputs.working_on) {
      UserService.addStudent(inputs)
    } else {
      alert("Please enter valid info!")
    }
  }

  const deleteStudent = (id: number) => {
    UserService.deleteStudent(id.toString())
    setStudentsInfo(() => {
      return studentsInfo.filter(student => student.student_id !== id)
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
        <div className={styles.main_content}>
          <form className={hidden ? styles.hidden : styles.form}>
            <h2 className={styles.title}>Add Student</h2>
            <div className={styles.form_group}>
              <label>Name</label>
              <input type="text" name="student_name" id="name" value={inputs.student_name} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>ID</label>
              <input type="number" name="id" id="id" value={inputs.id} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Date of birth</label>
              <input type="text" name="date_of_birth" id="date_of_birth" value={inputs.date_of_birth} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Age</label>
              <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Weight</label>
              <input type="number" name="weight" id="weight" value={inputs.weight} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Height</label>
              <input type="number" name="height" id="height" value={inputs.height} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Address</label>
              <input type="text" name="address" id="address" value={inputs.address} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Educational framework</label>
              <input type="text" name="framework" id="framework" value={inputs.framework} onChange={handleChange} />
            </div>
            <div className={styles.form_group}>
              <label>Working on</label>
              <input type="text" name="working_on" id="working_on" value={inputs.working_on} onChange={handleChange} />
            </div>
            <div className={styles.form_select}>
              <label>HMO</label>
              <select name="hmo" id="hmo" value={inputs.hmo} onChange={handleChange}>
                <option value="">Choose HMO</option>
                <option value="0">Macabi</option>
                <option value="1">Clalit</option>
                <option value="2">Meuhedet</option>
              </select>
            </div>
            <div className={styles.flex}>
              <button className={styles.Btns} onClick={addStudent}>Add Student</button>
              <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
            </div>
          </form>
          <button className={styles.addBtn} onClick={shiftStateForm}>Add Student</button>
          <input className={styles.search} type="text" name="search" placeholder='Search student...' onChange={(e) => setSearchTerm(e.target.value)} />
          <div className={styles.wrapper_container}>
            {studentsInfo.filter((student: Student) => {
                if (searchTerm === "") {
                  return student
                } else if (student.student_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                  return student
                }
              }).map((student: Student) => {
              return <div key={student.student_id} className={styles.student_container}>
                <div className={styles.name}>{student.student_name}</div>
                <div className={styles.wrapper}>
                  <div className={styles.container}>
                    <div className={styles.content}>
                      <label className={styles.label}>ID</label>
                      <div>{student.id}</div>
                    </div>
                    <div className={styles.content}>
                      <label className={styles.label}>Date of birth</label>
                      <div>{student.date_of_birth}</div>
                    </div>
                    <div className={styles.content}>
                      <label className={styles.label}>Age</label>
                      <div>{student.age}</div>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div className={styles.content}>
                      <label className={styles.label}>Weight</label>
                      <div>{student.weight}</div>
                    </div>
                    <div className={styles.content}>
                      <label className={styles.label}>Height</label>
                      <div>{student.height}</div>
                    </div>
                    <div className={styles.content}>
                      <label className={styles.label}>Address</label>
                      <div>{student.address}</div>
                    </div>
                  </div>
                  <div className={styles.container}>
                    <div className={styles.content}>
                      <label className={styles.label}>Educational framework</label>
                      <div>{student.framework}</div>
                    </div>
                    <div className={styles.content}>
                      <label className={styles.label}>Working on</label>
                      <div>{student.working_on}</div>
                    </div>
                  </div>
                </div>
                <img className={styles.svg} src={hmoNames[student.hmo as number].default} alt={hmoNames[student.hmo as number].toString()} />
                <button className={styles.deleteBtn} onClick={() => deleteStudent(student.student_id)}>Delete</button>
              </div>
            })}
          </div>
        </div>
      </div>}
    </>
  );
}

export default Students