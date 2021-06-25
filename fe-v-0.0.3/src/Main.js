import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Switch
} from "react-router-dom";
import HomePage from './components/HomePage'
import Logo from './images/nav-logo.png'
import './Main.css'

function Main(){
    return (
    <Container className="bg-dark main" fluid>
        <Router>
            <Navbar variant="dark" bg="dark">
                <Container className="mr-auto">
                    <Navbar.Brand href="#">
                        <Image
                            src={Logo}
                            alt="Wristband Collection Logo"
                        />
                    </Navbar.Brand>
                </Container>
                <Nav variant="pills">
                    <Nav.Item>
                        <NavLink exact to='/' className="nav-link text-dark bg-light mx-2" activeClassName="active">Home</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to='/artists' className="nav-link text-dark bg-light mx-2" activeClassName="active">Artists</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to='/venues' className="nav-link text-dark bg-light mx-2" activeClassName="active">Venues</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to='/login' className="nav-link text-dark bg-light mx-2" activeClassName="active">Login</NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar>
            <Switch>
                <Route path='/artists'>
                    <h1>Artists</h1>
                </Route>
                <Route path='/venues'>
                    <h1>Venues</h1>
                </Route>
                <Route path='/login'>
                    <h1>Login</h1>
                </Route>
                <Route path='/'>
                    <HomePage />
                </Route>
            </Switch>
        </Router>
        <Container className="footer">
            <p className="text-light">The Wristband Collection</p>
        </Container>
    </Container>)
}

export default Main