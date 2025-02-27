import { ComponentType } from "react";
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion";

function slideIn(OgComponent: ComponentType)
{
    return () => (
        <>
            <OgComponent />
            <AnimatePresence mode="wait">
                <motion.div
                    key="slide-in"
                    className="slide-in"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0 }}
                />
            </AnimatePresence>
        </>
    );
};
export default slideIn;