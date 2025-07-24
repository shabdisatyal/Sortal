import Navbar from '../component/Navbar';
import Logo from '../component/Imagecardslider';
import "../Pages/App.css";


function Header() {
    return(
        <div className="header">
    <div className="Flexbox">
        <Logo/>
        <Navbar/>
    </div>
</div>
    )
}

export default Header;
 