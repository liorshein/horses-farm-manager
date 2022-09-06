import { useEffect, useState } from 'react'
import UserService from '../../services/userService'

// TODO (1): Decide what to show on horses page (Healthy horses that can work, nonassignable horses...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

type Props = {}

type Horse = {
  horse_id: number
  name: string
  age: string
  breed: string
  assignable: boolean | string
}

const Horses = (props: Props) => {
  const [horsesInfo, setHorsesInfo] = useState<Horse[]>([]);

  const [inputs, setInputs] = useState<Horse>({
    horse_id: 0,
    name: '',
    age: '',
    breed: '',
    assignable: '',
  })

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const getData = async () => {
      const horsesData = await UserService.getHorsesInfo()
      setHorsesInfo(horsesData)
    }
    getData()
  }, [])

  const handleClick = async () => {
    if (inputs.assignable === "True") {
      inputs.assignable = true
    } else {
      inputs.assignable = false
    }
    UserService.addHorse(inputs.name, Number(inputs.age), inputs.breed, inputs.assignable)
  }

  console.log(horsesInfo);
  

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

      <div className="content">
        <h1>Horses:</h1>
        {horsesInfo.map((horse: Horse) => {
          return <div key={horse.horse_id}>name: {horse.name}, age: {horse.age}, breed: {horse.breed}, assignable: {horse.assignable.toString()}</div>
        })}
      </div>
    </>
  );
}

export default Horses