import Layout from '../Layout';
import NavCard from './comps/NavCard';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Dashboard - Rise \'n Climb'
    };
  }

  render() {
    return (
      <Layout title={this.state.pageTitle}>
        <h1>Dashboard</h1>
        <p>Here are the tools at your fingertips to help you get there.</p>

        <NavCard linkHref="./Todos" imgSrc="/todos-icon.svg" caption="To-do Lists" />
        <NavCard linkHref="./Goals" imgSrc="/goals-icon.svg" caption="S.M.A.R.T. Goals" />
        <NavCard linkHref="" imgSrc="/habits-icon.svg" caption="Habit Tracking" />
        <NavCard linkHref="" imgSrc="/time-icon.svg" caption="Time Management" />
      </Layout>
    );
  }
}

export default Dashboard;
