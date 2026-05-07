import {useState, useEffect} from 'react';



function Square(props) {

const[value, setValue] = useState('');

function handleClick() {
    if(value === '')
    setValue('X');
}
if (value === '') {
    setValue('O');

    return (
        <div onClick={handleClick}>
            <h4>Square</h4>
        </div>
    )
}

export default Square;