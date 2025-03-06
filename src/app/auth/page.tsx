// authorization page

import styles from "./auth.module.css";
import AuthButton from "@/components/AuthButton";

export default function Home() 
{
  return (
    <div className={styles.containerAuth}>
        <AuthButton />
    </div>
  );
}
