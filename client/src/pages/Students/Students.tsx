import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios'
import Loader from '../../components/Loader/Loader'
import useAuth from '../../hooks/useAuth'
import styles from "./students.module.scss"
const clalit = require("../../assets/icons/clalit.svg")
const meuhedet = require("../../assets/icons/meuhedet.svg")
const macabi = require("../../assets/icons/macabi.svg")

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
  instructor_id: number
  instructor_name: string
}

export type Instructor = {
  instructor_id: string
  instructor_name: string
}

const hmoNames = [clalit, macabi, meuhedet]

const Students = () => {
  const [studentsInfo, setStudentsInfo] = useState<Student[]>([]);
  const [instructorsInfo, setInstructorsInfo] = useState<Instructor[]>([])
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
    instructor_id: 0,
    instructor_name: ''
  })
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const { roles } = useAuth()!

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        if (roles.includes("User")) {
          const studentsData = await (await axiosPrivate.get("/instructors/user-students")).data.result
          isMounted && setStudentsInfo(studentsData)
        } else {
          const studentsAllData = await (await axiosPrivate.get("/admin/students")).data.result
          const allInstructors = await (await axiosPrivate.get("/admin/instructors")).data.result
          isMounted && setStudentsInfo(studentsAllData)
          isMounted && setInstructorsInfo(allInstructors)
        }
      } catch (error) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getData()

    return () => {
      isMounted = false;
      controller.abort()
    }
  }, [])

  const shiftStateForm = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (hidden === true) {
      setHidden(false)
    } else {
      setHidden(true)
    }
  }

  const addStudent = async (e: any) => {
    e.preventDefault()
    if (inputs.address !== '' && inputs.age !== '' && inputs.date_of_birth !== '' && inputs.framework !== '' &&
      inputs.height !== '' && inputs.hmo !== '' && inputs.id !== '' && inputs.student_name !== '' &&
      inputs.weight !== '' && inputs.working_on) {

      axiosPrivate.post("/admin/add-student", {
        name: inputs.student_name,
        id: inputs.id,
        date_of_birth: inputs.date_of_birth,
        age: inputs.age,
        weight: inputs.weight,
        height: inputs.height,
        hmo: inputs.hmo,
        address: inputs.address,
        framework: inputs.framework,
        working_on: inputs.working_on,
        instructor_id: inputs.instructor_id
      });

      if (roles.includes("User")) {
        const studentsData = await (await axiosPrivate.get("/instructors/user-students")).data.result
        setStudentsInfo(studentsData)
      } else {
        const studentsAllData = await (await axiosPrivate.get("/admin/students")).data.result
        setStudentsInfo(studentsAllData)
      }

    } else {
      alert("Please enter valid info!")
    }
  }

  const deleteStudent = (id: number) => {
    let params = new URLSearchParams({ student_id: id.toString() })
    axiosPrivate.delete(`/admin/delete-student?${params}`)
    setStudentsInfo(() => {
      return studentsInfo.filter(student => student.student_id !== id)
    })
  }

  return (
    <> {loading ? < Loader /> :
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          {roles.includes("User") ? <div className={styles.emptyDiv}></div> : <>
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
              <div className={styles.select}>
                <div>
                  <select name="instructor_id" id="instructor_id" value={inputs.instructor_id} onChange={handleChange}>
                    <option>Pick Instructor</option>
                    {instructorsInfo.map((instructor: Instructor) => {
                      return <option key={instructor.instructor_id} value={instructor.instructor_id}>{instructor.instructor_name}</option>
                    }
                    )}
                  </select>
                </div>
              </div>
              <div className={styles.flex}>
                <button className={styles.Btns} onClick={addStudent}>Add Student</button>
                <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
              </div>
            </form>
            <button className={styles.addBtn} onClick={shiftStateForm}>Add Student</button>
          </>}
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
                    {!roles.includes("User") ? <div className={styles.content}>
                      <label className={styles.label}>Instructor</label>
                      <div>{student.instructor_name}</div>
                    </div> : <></>}
                  </div>
                </div>
                <img className={styles.svg} src={hmoNames[student.hmo as number].default} alt={hmoNames[student.hmo as number].toString()} />
                {roles.includes("User") ? <></> :
                  <button className={styles.deleteBtn} onClick={() => deleteStudent(student.student_id)}>Delete</button>}
              </div>
            })}
          </div>
        </div>
      </div>}
    </>
  );
}

export default Students