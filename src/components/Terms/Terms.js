import React, { useState } from 'react';
import './Terms.scss';
import { Link } from 'react-router-dom';


const Terms = ({ updateSearch }) => {
    const [term1, setTerm1] = useState();
    const [term2, setTerm2] = useState();

    const handleChange1 = (event) => {
        setTerm1(event.target.value)
        console.log(term1)
    }
    const handleChange2 = (event) => {
        setTerm2(event.target.value)
    }
    return (
        <section>
            <Link to='/'><button className='back-button'>Go Back</button></Link>
            <h1>L </h1>
            <p> E </p>
            <form onSubmit={(event) => { updateSearch(event, [term1, term2]) }}><p></p>
                <input
                    type='text'
                    placeholder='Enter term #1'
                    value={term1}
                    onChange={() => handleChange1}>
                </input><p> T </p>
                <input
                    type='text'
                    placeholder='Enter term #2'
                    value={term2}
                    onChange={handleChange2}>
                </input><p> A </p>
                <Link to='/'><button>Click here to submit</button></Link>
            </form>
        </section>
    )
}
export default Terms;