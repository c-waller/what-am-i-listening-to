// Routing and styles
import {Routes, Route, useLocation} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import "./styles/styles.css"

// Import our pages
import Authenticate from "./pages/Authenticate";
import Landing from "./pages/Landing";

function App() 
{
    const location = useLocation(); 

    return ( 
        <>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />}/>
                <Route path="/quiz" element={<Authenticate />}/>
            </Routes>
        </AnimatePresence>
        </>
    )
}
export default App;