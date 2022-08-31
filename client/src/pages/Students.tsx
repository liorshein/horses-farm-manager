import React, { useState } from 'react'
import UserService from '../services/userService'

type Props = {}

const Students = (props: Props) => {
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
  })

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleClick = () => {
    UserService.addStudent(inputs.name, inputs.age)
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
        <button onClick={handleClick}>Add Student</button>
      </form>
    </>
  );
}

export default Students