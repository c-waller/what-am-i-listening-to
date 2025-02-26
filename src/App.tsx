// Routing and styles
import {Routes, Route, useLocation} from "react-router-dom";
import "./styles/styles.css"

// Import our pages
import Authenticate from "./pages/Authenticate";
import Landing from "./pages/Landing";

function App() 
{
    const location = useLocation(); 

    return ( 
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />}/>
                <Route path="/quiz" element={<Authenticate />}/>
            </Routes>
        </>
    )
}

export default App;