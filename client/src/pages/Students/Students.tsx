import { useState } from 'react'
import { ActionFunction, LoaderFunction, useLoaderData } from 'react-router-dom'
import { addStudent, deleteStudent, editStudent, getStudents } from '../../api/students'
import useAuth from '../../hooks/useAuth'
import { Instructor, Student } from '../../util/types'
import styles from "./students.module.scss"
import StudentsForm from './StudentsForm'
import StudentCards from './StudentCards'

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

const Students = () => {
  const { roles } = useAuth()!
  const { instructorsData, studentsData } = useLoaderData() as Data

  const [hidden, setHidden] = useState(true)
  const [edit, setEdit] = useState(false)
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
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        {roles.includes("User") ? <div className={styles.emptyDiv}></div> :
          <StudentsForm
            instructorsData={instructorsData}
            inputs={inputs}
            edit={edit}
            hidden={hidden}
            setInputs={setInputs}
            setEdit={setEdit}
            setHidden={setHidden} />}
        <input className={styles.search}
          type="text"
          name="search"
          placeholder='Search student...'
          onChange={(e) => setSearchTerm(e.target.value)} />
        <StudentCards
          studentsData={studentsData}
          roles={roles}
          searchTerm={searchTerm}
          setHidden={setHidden}
          setEdit={setEdit}
          setInputs={setInputs} />
      </div>
    </div>
  )
}

export default Students