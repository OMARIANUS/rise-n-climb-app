import Layout from './Layout';
import Link from 'next/link';

import './styles/empty.css';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Rise \'n Climb'
    };
  }

  render() {
    return (
      <Layout title={this.state.pageTitle}>
        <h1>Rise 'n Climb</h1>
        <p>Your planning board towards a brighter future.</p>

        <Link href="./modules/Dashboard">
          <a>
            <button>Start With Template</button>
          </a>
        </Link>
      </Layout>

    );
  }
}

export default Index;
