import TodoTask from './TodoTask';
import UniqID from 'uniqid';

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      stillAlive: true
    }

    this.createTask = this.createTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.storeInCache = this.storeInCache.bind(this);
  }

  componentDidMount() {
    let cachedTasks = sessionStorage.getItem(`${this.props.id}`);

    this.storeInCache();
    cachedTasks && this.setState({ tasks: JSON.parse(cachedTasks) });
  }

  componentDidUpdate() {
    this.storeInCache();
  }

  createTask() {
    this.setState(pvStt => {
      let newTasks = pvStt.tasks;

      newTasks.push({
        key: UniqID(),
        orderIndex: newTasks.length,
        text: '',
        completed: false
      });

      return { tasks: newTasks }
    });
  }

  handleChange(isTask = false, id, method) {
    this.setState(pvStt => {
      let newTasks = pvStt.tasks;

      if (isTask) {
        if (method) {
          if (method === 'asc') {
            newTasks[id].orderIndex--;
            newTasks[id - 1].orderIndex++;
          }

          else if (method === 'desc') {
            newTasks[id].orderIndex++;
            newTasks[id + 1].orderIndex--;
          }

          else if (method === 'edit')
            newTasks[id].text = event.target.value;

          else if (method === 'toggle')
            newTasks[id].completed = event.target.checked;

          newTasks.sort((a, b) => { return a.orderIndex - b.orderIndex; });
          return { tasks: newTasks }
        }

        newTasks = newTasks.filter(item => id !== item.key);
        newTasks = newTasks.map((item, index) => {
          return {
            key: item.key,
            orderIndex: index,
            text: item.text,
            completed: item.completed
          }
        });
        return { tasks: newTasks }
      }

      this.props.removeHandler(id);
    });
  }

  storeInCache() {
    let prospectiveCache = this.state.tasks;
    sessionStorage.setItem(`${this.props.id}`, JSON.stringify(prospectiveCache));
  }

  render() {
    return (
      <>
        <div className="todo-list">
          {
            this.state.tasks.length !== 0 ? (
              this.state.tasks.map((item, index) => {
                return (
                  <TodoTask
                    key={item.key}
                    id={item.key}
                    sortId={item.orderIndex}
                    taskText={this.state.tasks[index].text}
                    isCompleted={this.state.tasks[index].completed}
                    isPrev={Boolean(this.state.tasks[index - 1])}
                    isNext={Boolean(this.state.tasks[index + 1])}
                    handler={this.handleChange}
                  />
                );
              })
            ) :
              <p>Tasklist is empty.</p>
          }

          <button onClick={this.createTask}>Add Task</button>
          <button onClick={() => this.handleChange(false, this.props.id)}>
            Remove List
          </button>
        </div>

        <style jsx global>{`
          .todo-lists {
            width: 80%;
            margin: 0 auto;
          }

          .todo-lists .todo-list {
            margin: 10px 20px;
            padding: 25px;
            background-color: #EEE;
          }

          .todo-list-task {
            display: flex;
            align-items: center;
            margin: 10px 0px;
            text-align: left;
            border-radius: 22px;
            background-color: #aaa;
          }

          .todo-list-task input[type="text"] {
            width: 85%;
            color: white;
            border-width: 0px;
            background-color: transparent;
          }

          .todo-list-task input[type="checkbox"] {
            margin-left: 10px;
          }

          .todo-list-task button {
            padding: 0;
            border-width: 0px;
            background-color: transparent;
          }

          .todo-list-task button:not(:disabled):hover {
            color: silver;
            background-color: inherit;
          }
        `}</style>
      </>
    );
  }
}

export default TodoList;
