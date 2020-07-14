// Friends
// Purpose: Display Strava friends rank on TC and allows user interaction. 
// Export: SideView
// --TBD-- 
// Full Implementation due.
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './css/Filters.css';

function Filters(props) {
    const [input, setInput] = useState([]);

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setInput(value);
    }

    return (
        <div className="side-view">
            <h1>Filters</h1>

            <Form className="">
                <Form.Group controlId="formBasicText">
                    <Form.Control className="form-input" type="text" placeholder="Enter Post Code" name="filter" value={input} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="buttons">
                    <Button variant="primary">
                        Submit
                    </Button>
                </Form.Group>
            </Form>

        </div>
    );
}


export default Filters;