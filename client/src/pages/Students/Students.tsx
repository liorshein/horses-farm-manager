import { useState } from 'react'
import { ActionFunction, LoaderFunction, useFetcher, useLoaderData } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios'
import { addStudent, deleteStudent, editStudent, getStudents } from '../../api/students'
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

type Data = {
  instructorsData: Instructor[]
  studentsData: Student[]
}

export const loader: LoaderFunction = async () => {
  return getStudents()
}

export const action: ActionFunction = async ({ request }) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const student = Object.fromEntries(formData);
      await addStudent(student);
      break;
    }

    case "PUT": {
      const formData = await request.formData();
      const student = Object.fromEntries(formData);
      await editStudent(student);
      break;
    }

    case "DELETE": {
      const studentId = request.url.split("?")[1];
      await deleteStudent(studentId);
      break;
    }
  }
}

const hmoNames = [clalit, macabi, meuhedet]

const Students = () => {
  const { roles } = useAuth()!
  const fetcher = useFetcher();
  const { instructorsData, studentsData } = useLoaderData() as Data
  
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
  const [edit, setEdit] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

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
    setEdit(false)
  }

  const setForEdit = (student: Student) => {
    setHidden(false)
    setInputs(student)
    setEdit(true)
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        {roles.includes("User") ? <div className={styles.emptyDiv}></div> : <>
          <fetcher.Form method={edit ? 'put' : 'post'} className={hidden ? styles.hidden : styles.form}>
            <h2 className={styles.title}>Add Student</h2>
            <input className={styles.hidden} type="number" name="student_id" id="student_id" value={inputs.student_id} onChange={handleChange} />
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
            <div className={styles.form_select}>
              <label>For</label>
              <select name="instructor_id" id="instructor_id" value={inputs.instructor_id} onChange={handleChange}>
                <option>Pick Instructor</option>
                {instructorsData.map((instructor: Instructor) => {
                  return <option key={instructor.instructor_id} value={instructor.instructor_id}>{instructor.instructor_name}</option>
                }
                )}
              </select>
            </div>
            <div className={styles.flex}>
              {!edit ? <button className={styles.Btns}>Add Student</button>
                : <button className={styles.Btns}>Update Student</button>}
              <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
            </div>
          </fetcher.Form>
          <button className={styles.addBtn} onClick={shiftStateForm}>Add Student</button>
        </>}
        <input className={styles.search} type="text" name="search" placeholder='Search student...' onChange={(e) => setSearchTerm(e.target.value)} />
        <div className={styles.wrapper_container}>
          {studentsData.filter((student: Student) => {
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
                <div className={styles.btn_div}>
                  <fetcher.Form method='delete' action={`/students?${student.student_id}`}>
                    <button className={styles.studentBtn}>Delete</button>
                  </fetcher.Form>
                  <button className={styles.studentBtn} onClick={() => setForEdit(student)}>Edit</button>
                </div>}
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Students