class TodoTask extends React.Component {
  constructor() {
    super();
    this.state = {
      isText: false,
      isHover: false,
      isMoreOptsOn: false
    }
    this.todoTaskText = React.createRef();

    this.checkText = this.checkText.bind(this);
    this.mouseHover = this.mouseHover.bind(this);
    this.checkMoreOptsStatus = this.checkMoreOptsStatus.bind(this);
  }

  componentDidMount() {
    if (!this.props.taskText)
      this.todoTaskText.current.focus();
  }

  checkText() {
    !this.props.taskText && this.props.handler(true, this.props.id);
  }

  mouseHover(action) {
    this.setState({ isHover: action === 'over' ? true : false });
  }

  checkMoreOptsStatus() {
    this.setState({ isMoreOptsOn: !this.state.isMoreOptsOn });
  }

  render() {
    let tltStyles = []; // Array to store conditional styles for below elements
    tltStyles.push(`${this.props.isCompleted && 'completed'}`);
    tltStyles.push(`${this.state.isMoreOptsOn && 'parent-mods-activated'}`);
    tltStyles.push(`${this.state.isMoreOptsOn && 'mods-activated'}`);
    tltStyles.push(`${!this.state.isHover && !this.state.isMoreOptsOn && 'hidden'}`);

    return (
      <div
        className={`todo-list-task ${tltStyles[0]} ${tltStyles[1]}`}
        onMouseOver={() => this.mouseHover('over')}
        onMouseOut={() => this.mouseHover('out')}
      >
        <input
          type="checkbox"
          disabled={this.state.isMoreOptsOn}
          checked={this.props.isCompleted}
          onChange={() => this.props.handler(true, this.props.sortId, 'toggle')}
        />
        <input
          ref={this.todoTaskText}
          type="text"
          value={this.props.taskText}
          disabled={this.props.isCompleted || this.state.isMoreOptsOn}
          onChange={event => {
            this.props.handler(true, this.props.sortId, 'edit', event.target.value)
          }}
          onBlur={this.checkText}
        />

        <div className={`todo-list-task-buttons ${tltStyles[2]} ${tltStyles[3]}`}>
          <button className="more-opts-button" onClick={this.checkMoreOptsStatus}>
            <img src="/more-options.svg" />
          </button>

          <div className="modify-buttons">
            <button
              className="del-button"
              onClick={() => this.props.handler(true, this.props.id)}
            >
              <img src="/x-delete.svg" />
            </button>
            <button
              className="upward-button"
              disabled={this.props.isPrev ? false : true}
              onClick={() => this.props.handler(true, this.props.sortId, 'asc')}
            >
              <img src="/up-arrow.svg" />
            </button>
            <button
              className="downward-button"
              disabled={this.props.isNext ? false : true}
              onClick={() => this.props.handler(true, this.props.sortId, 'desc')}
            >
              <img src="/down-arrow.svg" />
            </button>
          </div>
        </div>

        <style jsx>{`
          img {
            height: 18px;
            width: 18px;
          }

          img:hover {
            filter: contrast(.4);
          }

          button:disabled img {
            filter: contrast(0);
          }

          .hidden {
            visibility: hidden;
          }

          .completed {
            text-decoration: line-through;
            text-decoration-color: white;
          }

          .completed input[type="text"] {
            color: gray;
          }

          .parent-mods-activated {
            padding: 11px 0px;
            background-color: hsl(0, 0%, 80%);
          }

          .mods-activated {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0%);
          }

          .mods-activated .modify-buttons {
            display: inline-block;
          }

          @media screen and (min-width: 0px) {
            .more-opts-button {
              display: inline-block;
            }

            .modify-buttons {
              display: none;
            }
          }

          @media screen and (min-width: 720px) {
            div.todo-list-task-buttons {
              width: 9rem;
            }

            .more-opts-button {
              display: none;
            }

            .modify-buttons {
              display: inline-block;
            }
          }
        `}</style>
      </div>
        )
    }
}

export default TodoTask;
