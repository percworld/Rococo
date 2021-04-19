import React, { useState } from 'react';
import './Terms.scss';
import { Link } from 'react-router-dom';


const Terms = ({ updateSearch }) => {
    const [term1, setTerm1] = useState("");
    const [term2, setTerm2] = useState("");

    return (
        <section>
            <Link to='/'><button className='back-button'>Go Back</button></Link>
            <h1>L </h1>
            <p> E </p>
            <form><p></p>
                <input
                    type='text'
                    name='term1'
                    placeholder='Enter term #1'
                    value={term1}
                    onChange={e => setTerm1(e.target.value)}>
                </input><p> T </p>
                <input
                    type='text'
                    name='term2'
                    placeholder='Enter term #2'
                    value={term2}
                    onChange={e => setTerm2(e.target.value)}>
                </input><p> A </p>
                <Link to='/' ><button onClick={() => updateSearch([term1, term2])}>Click here to submit</button></Link>
            </form>
        </section>
    )
}
export default Terms;