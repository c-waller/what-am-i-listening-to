import { ComponentType } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const slideOut = (OgComponent: ComponentType) => {
    return () => (
        <>
            <OgComponent />
            <AnimatePresence mode="wait">
                <motion.div
                    key="slide-out"
                    className="slide-out"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 1.5, ease: [0.15, 1, 0.1, 1] }}
                />
            </AnimatePresence>
        </>
    );
};
export default slideOut;