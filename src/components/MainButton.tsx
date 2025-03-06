// stylized button component

import styles from "./MainButton.module.css";

type MainButtonProps = 
{
    children: React.ReactNode;
    className?: string; // optional className attribute
}
  
export default function MainButton({ children, className }: MainButtonProps) 
{
    return (
      <button className={`${styles.mainButton} ${className || ""}`} type="button">
        {children}
      </button>
    );
}