import  styles from '../styles/DateCard.module.scss'
import { motion, AnimatePresence } from "framer-motion"
export default function DateCard(props) {
    return (
        <motion.div className={styles.CardContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ transform: `rotate(15deg) translate(50px)` }}
        >
          <img src={props.sweetheart?.profilepic} />
          <div className={styles.Description}>
            <h1> {props.sweetheart?.username}, {props.sweetheart?.userage}</h1>
          </div>
          <div className={styles.actions}>
            <button value="dislike" onClick={props.onClick} data={props.data} uid={props.sweetheart?.uid}>💔</button>
            <button onClick={props.onClick} data={props.data}>😐</button>
            <button value="like" onClick={props.onClick} data={props.data} uid={props.sweetheart?.uid}>💝</button>
          </div>
         

        </motion.div>
    )
  }