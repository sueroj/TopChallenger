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
    const [exploration, toggleExploration] = useState(true);
    const [sprints, toggleSprints] = useState(true);
    const [routes, toggleRoutes] = useState(true);
    const [completed, toggleCompleted] = useState(true);

    function handleExploration() {
        toggleExploration(!exploration);
        updateFilters("exploration", !exploration);
    }

    function handleSprints() {
        toggleSprints(!sprints);
        updateFilters("sprints", !sprints);
    }

    function handleRoutes() {
        toggleRoutes(!routes);
        updateFilters("routes", !routes);
    }

    function handleCompleted() {
        toggleCompleted(!completed);
        updateFilters("completed", !completed);
    }

    function updateFilters(type, value) {
        const filter = {
            exploration: exploration,
            sprints: sprints,
            routes: routes,
            completed: completed,
            [type]: value
        };
        props.updateFilters(filter);
    }

    return (
        <div className="side-view">
            <h1>Filters</h1>

            <Form className="">
                <Form.Group controlId="filterSelect">
                    <Form.Check type="switch" id="exploration" label="Exploration" onChange={handleExploration} checked={exploration}/>
                    <Form.Check type="switch" id="sprints" label="Sprints" onChange={handleSprints} checked={sprints}/>
                    <Form.Check type="switch" id="routes" label="Routes" onChange={handleRoutes} checked={routes}/>
                    <Form.Check type="switch" id="completed" label="Completed" onChange={handleCompleted} checked={completed}/>
                </Form.Group>
            </Form>

        </div>
    );
}

export default Filters;