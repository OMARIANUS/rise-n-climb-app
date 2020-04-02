function Milestone(props) {
  return (
    <div>
       <input
         type="checkbox"
         checked={props.isCompleted}
         onChange={() => props.handler('check', props.sortId)}
       />
       <span>{props.text}</span>

       {
         props.isWizardMode && (
           <>
             <button onClick={() => props.handler('del', props.id)}>DEL</button>
             <button
               disabled={props.isPrev ? false : true}
               onClick={() => props.handler('asc', props.sortId)}
             >
               ↑
             </button>
             <button
               disabled={props.isNext ? false : true}
               onClick={() => props.handler('desc', props.sortId)}
             >
               ↓
             </button>
           </>
         )
       }
    </div>
  )
}

export default Milestone;
