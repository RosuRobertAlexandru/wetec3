import { useState } from 'react';

const AddDevice = (props) => {
	const { onAdd } = props
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)

	const addDevice = (evt) =>{
        evt.preventDefault()
        onAdd({
            name,
			price
           
        })

        setName("");
		setPrice("")
        
    }

	return (
		<div>
		<p>Add a device</p>
		<input placeholder='name' id="name" value={name} onChange={(evt) => setName(evt.target.value)}></input>
		<input placeholder='price' id="price" value={price} onChange={(evt) => setPrice(evt.target.value)}></input>
		<button onClick={addDevice}>add</button>
		</div>
	)
}

export default AddDevice