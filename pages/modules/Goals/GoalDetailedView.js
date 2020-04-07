import Layout from '../../Layout';
import Milestone from './Milestone';
import DatePicker from 'react-datepicker';

import './css/react-datepicker.css';

class GoalDetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Goal Info - Rise \'n Climb',
      buffer: '',
      ...this.props.viewedGoal
    }

    this.updateMilestones = this.updateMilestones.bind(this);
  }

  updateMilestones(method, id) {
    this.setState(pvStt => {
      let milestones = this.state.milestones;
      let newMilestones = milestones.map(item => { return { ...item } });

      try {
        newMilestones[id].completed = event.target.checked;
      }
      catch(err) {
        window.alert(err);
      }

      return { milestones: newMilestones }
    });
  }

  render() {
    let goalProgSttStyle = this.state.completed ? 'status-completed' : 'status-progress';

    // console.log(this.props.viewedGoal);
    return (
      <Layout title={this.state.pageTitle}>
        <h1>{this.state.pageTitle}</h1>

        <div className="goal-view">
          <div className="goal-entry">
            <div className="goal-info">
              <p>Goal Title</p>
              <input
                className="title"
                type="text"
                defaultValue={this.state.goalTitle}
                maxLength="35"
                onChange={event => this.setState({ buffer: event.target.value })}
                onBlur={event => this.setState({ goalTitle: event.target.value })}
              />

              <p>Goal Description</p>
              <textarea
                defaultValue={this.state.description}
                rows="2"
                maxLength="75"
                spellCheck="false"
                onChange={event => this.setState({ buffer: event.target.value })}
                onBlur={event => this.setState({ description: event.target.value })}
              />

              <p>Goal Milestones</p>
              {
                this.state.milestones && this.state.milestones.length ?
                <>
                  {
                    this.state.milestones.map((item, index) => {
                      return (
                        <Milestone
                          key={item.key}
                          id={item.key}
                          sortId={item.orderIndex}
                          text={item.text}
                          isCompleted={item.completed}
                          handler={this.updateMilestones}
                        />
                      )
                    })
                  }
                </> :
                <br />
              }

              <p>Goal Deadline</p>
              <DatePicker
                className="rd-corrector"
                dateFormat="dd/MM/yyyy"
                selected={this.state.deadline}
                onChange={date => this.setState({ deadline: date })}
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                withPortal
              />

              <p>Goal Progress Status</p>
              <span className={`special ${goalProgSttStyle}`}>
                {this.state.completed ? 'completed' : 'in progress'}
              </span>

              <div>
                <button
                  onClick={() => this.setState({ completed: !this.state.completed })}
                >
                  {`Mark as ${this.state.completed ? 'Incomplete' : 'Completed'}`}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => this.props.nextMove('save', this.state)}>
          Save and Exit
        </button>
        <button onClick={() => this.props.nextMove('discard')}>
          Exit Without Saving
        </button>
        <button onClick={() => this.props.nextMove('delete', this.state)}>
          Delete Goal
        </button>

        <style jsx>{`
          p {
            font-size: 1.25rem;
          }

          span {
            font-size: 1rem;
          }

          input, textarea {
            width: 88%;
            padding: 10px;
            border: 1px solid silver;
            border-radius: 5px;
            font-size: 1rem;
            color: black;
            background-color: white;
            resize: none;
          }

          .goal-entry {
            width: 50%;
          }

          .goal-info span {
            font-size: 1rem;
            text-transform: capitalize;
          }

          .goal-info p {
            margin-bottom: 10px;
          }

          .goal-info div {
            text-align: center;
          }

          .goal-info div button {
            margin: 10px auto;
            border: none;
            color: white;
            background-color: ${this.state.completed ? 'crimson' : 'mediumseagreen'};
          }

          .goal-info div button:hover {
            background-color: ${this.state.completed ? '#c71739' : '#379c64'};
          }
          `}
        </style>
      </Layout>
    )
  }
}

export default GoalDetailedView;
