import  styles from '../styles/DateCard.module.scss'
export default function DateCard(props) {
    return (
        <div className={styles.CardContainer}>
          <img src={props.sweetheart?.profilepic} />
          <div className={styles.Description}>
            <h1> {props.sweetheart?.username}, {props.sweetheart?.userage}</h1>
          </div>
          <div className={styles.actions}>
            <button onClick={props.onClick} data={props.data}>💔</button>
            <button onClick={props.onClick} data={props.data}>😐</button>
            <button onClick={props.onClick} data={props.data}>💝</button>
          </div>
         

        </div>
    )
  }