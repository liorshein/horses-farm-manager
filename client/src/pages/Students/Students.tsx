import { useState } from 'react'
import UserService from '../../services/userService'

type Props = {}

const Students = (props: Props) => {
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
    weight: '',
    background_info: '',
  })

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

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
    </>
  );
}

export default Students