import Layout from '../Layout';
import Goal from './Goals/Goal';
import GoalDetailedView from './Goals/GoalDetailedView';
import Wizard from './Goals/Wizard';
import UniqID from 'uniqid';

class Goals extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Goals - Rise \'n Climb',
      goals: [],
      goalToView: -1,
      detailMode: false,
      wizardMode: false
    }

    this.triggerDetailMode = this.triggerDetailMode.bind(this);
    this.runWizard = this.runWizard.bind(this);
    this.handleGoalUpdates = this.handleGoalUpdates.bind(this);
    this.createGoal = this.createGoal.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem('Goals')) {
      let cachedGoals = JSON.parse(sessionStorage.getItem('Goals'));

      cachedGoals.map(item => {
        item.deadline = new Date(`${item.deadline}`);
      });
      this.setState({ goals: cachedGoals });
    }

    else {
      let goals = this.state.goals;
      sessionStorage.setItem('Goals', JSON.stringify(goals));
    }
  }

  componentDidUpdate() {
    sessionStorage.setItem('Goals', JSON.stringify(this.state.goals));
  }

  triggerDetailMode(id) {
    this.setState({ goalToView: id, detailMode: true });
  }

  runWizard() {
    this.setState({ wizardMode: true });
  }

  handleGoalUpdates(method, newGoal = null) {
    this.setState(pvStt => {
      if (newGoal) {
        let newGoals = pvStt.goals;

        delete newGoal.pageTitle;
        delete newGoal.buffer;

        if (method === 'save')
          newGoals[this.state.goalToView] = newGoal;

        else if (method === 'delete')
          newGoals = newGoals.filter((item, index) => index !== this.state.goalToView);

        return { goals: newGoals, goalToView: -1, detailMode: false }
      }

      return { goalToView: -1, detailMode: false }
    });
  }

  createGoal(data) {
    this.setState(pvStt => {
      let newGoals = pvStt.goals;
      newGoals.push(data);

      return {
        goals: newGoals,
        wizardMode: false
      }
    });
  }

  render() {
    return (
      <>
        {
          this.state.wizardMode ? <Wizard nextMove={this.createGoal} /> :
          this.state.detailMode ?
          <GoalDetailedView
            viewedGoal={this.state.goals[this.state.goalToView]}
            nextMove={this.handleGoalUpdates}
          /> :

          <Layout title={this.state.pageTitle}>
            <h1>Goals</h1>

            <div className={this.state.goals.length !== 0 && "goal-view"}>
              {
                this.state.goals.length !== 0 ? this.state.goals.map((item, index) => {
                  return (
                    <Goal
                      key={UniqID()}
                      id={index}
                      title={item.goalTitle}
                      caption={item.description}
                      timeframe={item.deadline.toLocaleDateString('en-GB')}
                      isCompleted={item.completed}
                      handler={this.triggerDetailMode}
                    />
                  )
                }) :
                <p>You have not added any goals yet.</p>
              }
            </div>

            <button onClick={this.runWizard}>Add Goal</button>

            <style jsx global>{`

            `}</style>
          </Layout>
        }
      </>
    )
  }
}

export default Goals;
