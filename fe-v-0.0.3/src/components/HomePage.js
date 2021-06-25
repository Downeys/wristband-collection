import { Image } from 'react-bootstrap'
import HomeScreen from '../images/home-screen-1.jpg'
import './HomePage.css'

function HomePage(){
    return (
        <Image src={HomeScreen} className="backgroundPhoto" fluid />
    )
}

export default HomePage