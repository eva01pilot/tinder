export default function DateCard(props) {
    return (
      <section>
          <h1> {props.sweetheart?.username}</h1>
          <h2> {props.sweetheart?.description}</h2>
          <img src={props.sweetheart?.profilepic} />
      </section>
    )
  }