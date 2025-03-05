import styles from "./Card.module.css";
import MainButton from "./MainButton";

type CardProps = {
  imgSrc: string;
  title: string;
  // description: string;
  showButton?: boolean;
};

// Use forwardRef to pass the ref to the outermost div
export default function Card({ imgSrc, title, showButton = true }: CardProps)
{
  return (
    <div className={ styles.card }>
      <div className={ styles.cardBody }>
        <img src={ imgSrc } width="300" className={ styles.cardImage } />
        <h2 className={ styles.cardTitle }> { title } </h2>
        {/* <p className={ styles.cardDescription }> { description }</p> */}
      </div>
      {showButton && <MainButton className={styles.cardButton}> View </MainButton>}
    </div>
  );
}