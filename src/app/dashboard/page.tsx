import Image from "next/image";
import styles from "./dashboard.module.css";

export default function Home() 
{
  return (
    <div className={styles.containerDashboard}>
       <p> Welcome to the Dashboard </p>
    </div>
  );
}
