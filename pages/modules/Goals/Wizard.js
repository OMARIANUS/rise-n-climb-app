import Link from 'next/link';
import Layout from '../../Layout';
import Milestone from './Milestone';
import UniqID from 'uniqid';
import DatePicker from 'react-datepicker';

import './css/react-datepicker.css';

class Wizard extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Goal Creation Wizard - Rise \'n Climb',
      stepIndex: 0,
      stepHeaders: [
        'Goal Creation Wizard',
        'Step 1: Be Specific',
        'Step 2: Describe It',
        'Step 3: Measure It',
        'Step 4: Punctualize',
        'Step 5: Finalize'
      ],
      startDate: new Date(),
      buffer: '',
      goalInfo: {
        goalTitle: '',
        description: '',
        milestones: [],
        deadline: '',
        completed: false
      }
    }

    this.handleEdit = this.handleEdit.bind(this);
    this.traverseWizard = this.traverseWizard.bind(this);
    this.modifyMilestones = this.modifyMilestones.bind(this);
  }

  handleEdit(event) { this.setState({ buffer: event.target.value }); }

  traverseWizard(step) {
    this.setState(pvStt => {
      const si = pvStt.stepIndex;
      let resultant = pvStt.goalInfo;

      // Empty Field Checks

      if ((si === 1 || si === 2) && step === 'next' && !pvStt.buffer)
        alert('Please enter a valid value in input field.');

      else if (si === 3 && step === 'next' && !pvStt.goalInfo.milestones.length)
        alert('Please add at least one milestone.');

      // Normal Flow

      else {
        if (si === 1)
          resultant.goalTitle = pvStt.buffer;

        if (si === 2)
          resultant.description = pvStt.buffer;

        if (si === 4)
          resultant.deadline = pvStt.startDate;

        return {
          stepIndex: step === 'next' ? si + 1 : step === 'prev' ? si - 1 : si,
          goalInfo: {
            goalTitle: resultant.goalTitle,
            description: resultant.description,
            milestones: resultant.milestones,
            deadline: resultant.deadline,
            completed: false
          },
          buffer: ''
        }
      }
    });
  }

  modifyMilestones(operation, id = null) {
    this.setState(pvStt => {
      let newMilestones = pvStt.goalInfo.milestones;

      if (operation === 'add') {
        !pvStt.buffer ? alert('Please enter a valid value in input field.') :

        newMilestones.push({
          key: UniqID(),
          orderIndex: newMilestones.length,
          text: pvStt.buffer,
          completed: false
        });
      }

      else if (operation === 'check')
        newMilestones[id].completed = !newMilestones[id].completed;

      else {
        if (operation === 'del')
          newMilestones = newMilestones.filter(item => id !== item.key);

        else if (operation === 'asc') {
          newMilestones[id].orderIndex--;
          newMilestones[id - 1].orderIndex++;
        }

        else if (operation === 'desc') {
          newMilestones[id].orderIndex++;
          newMilestones[id + 1].orderIndex--;
        }

        newMilestones.sort((a, b) => { return a.orderIndex - b.orderIndex; });
        newMilestones = newMilestones.map((item, index) => {
          return {
            key: item.key,
            orderIndex: index,
            text: item.text,
            completed: item.completed
          }
        });
      }

      return {
        goalInfo: {
          goalTitle: pvStt.goalInfo.goalTitle,
          description: pvStt.goalInfo.description,
          milestones: newMilestones,
          deadline: pvStt.goalInfo.deadline
        },
        buffer: ''
      }
    });
  }

  render() {
    return (
      <Layout title={this.state.pageTitle}>
        <h1>{this.state.stepHeaders[this.state.stepIndex]}</h1>

        {
          this.state.stepIndex === 0 ?
          <p>Welcome! This wizard will guide you through the process of creating S.M.A.R.T. goals.</p> :

          this.state.stepIndex === 1 ?
          <div>
            <p>Please be specific with your goal, not vague.</p>
            <p>Bad Example: Develop video games.</p>
            <p>Good Example: Develop a first-person action shooter video game.</p>
          </div> :

          this.state.stepIndex === 2 ?
          <div>
            <p>Give us a description that best fits the kind of thing your goal is about.</p>
          </div> :

          this.state.stepIndex === 3 ?
          <div>
            <p>In order to avoid procrastination and many other undesirable<br />
            negative outcomes, goals must be measurable. Thus, we use milestones<br />
            to track progress on the long-term in combination with the short-term <br />
            focused todo lists.</p>
            <p>Examples:</p>
            <ul>
              <li>Produce a proof-of-concept.</li>
              <li>Lay out overall game design.</li>
              <li>Develop character models.</li>
            </ul>
            <p>WARNING: You will not be able to modify these later on.</p>

            <div>
              {
                this.state.goalInfo.milestones.length ?
                <>
                  {
                    this.state.goalInfo.milestones.map((item, index) => {
                      return (
                        <Milestone
                          key={item.key}
                          id={item.key}
                          sortId={item.orderIndex}
                          text={item.text}
                          isCompleted={item.completed}
                          isPrev={Boolean(this.state.goalInfo.milestones[index - 1])}
                          isNext={Boolean(this.state.goalInfo.milestones[index + 1])}
                          isWizardMode={true}
                          handler={this.modifyMilestones}
                        />
                      )
                    })
                  }
                </> :
                <br />
              }
            </div>
          </div> :

          this.state.stepIndex === 4 ?
          <div>
            <p>Setting a deadline will make sure you don't procrastinate <br />
            as you do your best to achieve the goal.</p>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={this.state.startDate}
              onChange={date => this.setState({ startDate: date })}
              inline
            />
          </div> :

          this.state.stepIndex === 5 ?
          <div>
            <p>Congrats! You have successfully created a new goal.</p>
          </div> :

          <span>Error!</span>
        }

        {
          this.state.stepIndex > 0 && this.state.stepIndex < 4 &&
          <>
            <input
              className="general-field"
              type="text"
              value={this.state.buffer}
              maxLength={this.state.stepIndex === 2 ? '75' : '25'}
              onChange={this.handleEdit}
            />
            <br />
          </>
        }

        {
          this.state.stepIndex === 3 &&
          <>
            <button onClick={() => this.modifyMilestones('add')}>Add</button>
          </>
        }

        <button
          disabled={this.state.stepIndex ? false : true}
          onClick={() => this.traverseWizard('prev')}
        >
          Previous
        </button>
        {
          this.state.stepIndex !== 5 ?
          <button onClick={() => this.traverseWizard('next')}>Next</button> :
          <button onClick={() => this.props.nextMove(this.state.goalInfo)}>Finish</button>
        }

        <style jsx>{`
          ul {
            display: inline-block;
          }

          input.general-field {
            width: 300px;
            margin-bottom: 10px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Wizard;
