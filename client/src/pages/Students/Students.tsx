import { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import UserService from '../../services/userService'
import styles from "./students.module.scss"
const logo = require("../../assets/icons/logo.svg")
const clalit = require("../../assets/icons/clalit.svg")
const meuhedet = require("../../assets/icons/meuhedet.svg")
const macabi = require("../../assets/icons/macabi.svg")

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
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
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
          <h2>Add Student</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="student_name" id="name" value={inputs.student_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>ID</label>
            <input type="number" name="id" id="id" value={inputs.id} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Date of birth</label>
            <input type="text" name="date_of_birth" id="date_of_birth" value={inputs.date_of_birth} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input type="number" name="weight" id="weight" value={inputs.weight} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input type="number" name="height" id="height" value={inputs.height} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" id="address" value={inputs.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Educational framework</label>
            <input type="text" name="framework" id="framework" value={inputs.framework} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Working on</label>
            <input type="text" name="working_on" id="working_on" value={inputs.working_on} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>HMO</label>
            <select name="hmo" id="hmo" value={inputs.hmo} onChange={handleChange}>
              <option value="">Choose HMO</option>
              <option value="0">Macabi</option>
              <option value="1">Clalit</option>
              <option value="2">Meuhedet</option>
            </select>
          </div>
          <button onClick={addStudent}>Add Student</button>
          <button onClick={shiftStateForm}>Return</button>
        </form>
        <button className={styles.addBtn} onClick={shiftStateForm}>Add Student</button>
        {studentsInfo.map((student: Student) => {
          return <div key={student.student_id} className={styles.student_container}>
            <div className={styles.name}>{student.student_name}</div>
            <div className={styles.wrapper}>
              <div className={styles.container}>
                <div>
                  <label className={styles.label}>ID:</label>
                  <span>{student.id}</span>
                </div>
                <div>
                  <label className={styles.label}>Date of birth:</label>
                  <span>{student.date_of_birth}</span>
                </div>
                <div>
                  <label className={styles.label}>Age:</label>
                  <span>{student.age}</span>
                </div>
              </div>
              <div className={styles.container}>
                <div>
                  <label className={styles.label}>Weight:</label>
                  <span>{student.weight}</span>
                </div>
                <div>
                  <label className={styles.label}>Height:</label>
                  <span>{student.height}</span>
                </div>
                <div>
                  <label className={styles.label}>Address:</label>
                  <span>{student.address}</span>
                </div>
              </div>
              <div className={styles.container}>
                <div>
                  <label className={styles.label}>Educational framework:</label>
                  <span>{student.framework}</span>
                </div>
                <div>
                  <label className={styles.label}>Working on:</label>
                  <span>{student.working_on}</span>
                </div>
              </div>
            </div>
            <img className={styles.svg} src={hmoNames[student.hmo as number].default} alt={hmoNames[student.hmo as number].toString()} />
            <button className={styles.deleteBtn} onClick={() => deleteStudent(student.student_id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default Students