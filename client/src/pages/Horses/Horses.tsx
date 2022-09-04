import { useState } from 'react'
import UserService from '../../services/userService'

type Props = {}

type Horse = {
  name: string
  age: string
  breed: string
  assignable: boolean | string
}

const Horses = (props: Props) => {
  const [inputs, setInputs] = useState<Horse>({
    name: '',
    age: '',
    breed: '',
    assignable: '',
  })

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (inputs.assignable === "True") {
      inputs.assignable = true
    } else {
      inputs.assignable = false
    }
    UserService.addHorse(inputs.name, Number(inputs.age), inputs.breed, inputs.assignable)
    // let horseId = await UserService.addHorse(inputs.name, Number(inputs.age), inputs.breed, inputs.assignable)
    // let horsesHours = await UserService.getHorseWorkHours(horseId)
    // console.log(horsesHours);
  }  

  return (
    <>
      <h2>Horses (Protected)</h2>

      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" id="name" value={inputs.name} onChange={handleChange} />
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
        <button onClick={handleClick}>Add Horse</button>
      </form>
    </>
  );
}

export default Horses