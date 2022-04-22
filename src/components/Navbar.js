import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://getbootstrap.com/docs/5.1/components/navbar/">
                    <img src="https://img.icons8.com/plasticine/200/invoice.png" alt="" width="60" height="48" className="d-inline-block align-text-top" />
                <strong  className="text-light" >Invoice S.A.S</strong>
                </a>
            </div>
        </nav>
    )
}

export default Navbar