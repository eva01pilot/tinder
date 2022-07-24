import  styles from '../styles/DateCard.module.scss'
export default function DateCard(props) {
    return (
        <div className={styles.CardContainer}>
          <img src={props.sweetheart?.profilepic} />
          <div className={styles.Description}>
            <h1> {props.sweetheart?.username}</h1>
            <h2> {props.sweetheart?.description}</h2>
          </div>
          <button onClick={props.onClick} data={props.data}>Pass</button>
        </div>
    )
  }