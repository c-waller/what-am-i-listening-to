import styles from "./MainButton.module.css";

type MainButtonProps = 
{
    children: React.ReactNode;
    className?: string;
}
  
export default function MainButton({ children, className }: MainButtonProps) 
{
    return (
      <button className={`${styles.mainButton} ${className || ""}`} type="button">
        {children}
      </button>
    );
}