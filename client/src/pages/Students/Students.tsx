import { useEffect, useState } from 'react'
import UserService from '../../services/userService'

// TODO (1): Decide what to show on students page (All students of the user, what data to show...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

type Props = {}

type Student = {
  student_id: number
  name: string
  age: string
  weight: string
  background_info: string
}

const Students = (props: Props) => {
  const [studentsInfo, setStudentsInfo] = useState<Student[]>([]);

  const [inputs, setInputs] = useState<Student>({
    student_id: 0,
    name: '',
    age: '',
    weight: '',
    background_info: '',
  })

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const getData = async () => {
      const studentsData = await UserService.getUserStudentsInfo()
      setStudentsInfo(studentsData)
    }
    getData()
  }, [])

  const handleClick = () => {
    UserService.addStudent(inputs.name, inputs.age, inputs.weight, inputs.background_info)
  }

  return (
    <>
      <h2>Students (Protected)</h2>

      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" id="name" value={inputs.name} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Weight</label>
          <input type="number" name="weight" id="weight" value={inputs.weight} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Background Info</label>
          <textarea name="background_info" id="background_info" cols={30} rows={10} value={inputs.background_info} onChange={handleChange}></textarea>
        </div>
        <button onClick={handleClick}>Add Student</button>
      </form>

      <div className="content">
        <h1>Students:</h1>
        {studentsInfo.map((student: Student) => {
          return <div key={student.student_id}>name: {student.name}, age: {student.age}, weight: {student.weight}, background: {student.background_info}</div>
        })}
      </div>
    </>
  );
}

export default Students