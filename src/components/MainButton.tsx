import styles from "./MainButton.module.css";

type MainButtonProps = 
{
    children: React.ReactNode;
}
  
export default function MainButton ( { children }: MainButtonProps )
{
    return <button className={styles.mainButton} type="button"> { children } </button>
}