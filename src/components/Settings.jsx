import NavBar from "./NavBar.jsx";
import Animate_page from "./Animate-page.jsx";
import '../css/Settings.css';

const Settings = () => {
    return (
        <div>
            <NavBar/>
            <Animate_page>
                <div className='settings'>
                    <div className='settings-container'>
                        Settings
                    </div>
                </div>
            </Animate_page>
        </div>
    )
}

export default Settings;