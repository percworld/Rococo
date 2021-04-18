import React, { useState } from 'react';
import './Terms.scss';
import { Link } from 'react-router-dom';


const Terms = ({ updateSearch }) => {
    const [term1, setTerm1] = useState();
    const [term2, setTerm2] = useState();
    const handleChange1 = (event) => {
        setTerm1(event.value)
    }
    const handleChange2 = (event) => {
        setTerm2(event.value)
    }
    return (
        <section>
            <Link to='/'><button className='back-button'>Go Back</button></Link>
            <form onSubmit={() => { updateSearch([term1, term2]) }}>
                <input
                    type='text'
                    placeholder='Enter term #1'
                    value={term1}
                    onChange={handleChange1}>
                </input>
                <input
                    type='text'
                    placeholder='Enter term #2'
                    value={term2}
                    onChange={handleChange2}>
                </input>
                <button>Click here to submit</button>
            </form>
        </section>
    )
}
export default Terms;