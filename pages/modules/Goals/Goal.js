function Goal(props){
  return (
    <div className="goal-entry">
      <div className="goal-short-info-1">
        <span>{props.title}</span>
        <p>{props.caption}</p>
      </div>

      <div className="goal-short-info-2">
        <div>
          <p>DEADLINE: {props.timeframe}</p>
          <span>STATUS: </span>
          <span className={props.isCompleted ? 'status-completed' : 'status-progress'}>
            {props.isCompleted ? 'Completed!' : 'in progress'}
          </span>
        </div>
        <div>
          <button onClick={() => props.handler(props.id)}>More info</button>
        </div>
      </div>

      <style jsx>{`
        p {
          margin: 5px 0;
        }

        p, span {
          overflow-wrap: break-word;
        }

        .goal-short-info-1 span {
          font-size: 1.5rem;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  )
}

export default Goal;
