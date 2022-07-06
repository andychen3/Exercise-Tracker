import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <nav class="navBar">
                <Link to="/"> <button>Home</button></Link>
                <Link to="/add-exercise"><button>Add</button></Link>
            </nav>
        </>
    );
}

export default Navigation;