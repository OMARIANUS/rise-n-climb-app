import Head from 'next/head';
import Link from 'next/link';
import UniqID from 'uniqid';
import Layout from '../Layout';
import TodoList from './Todos/TodoList';

class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'To-do Lists - Rise \'n Climb',
      selectedList: '',
      lists: [],
      lastNumberedList: 0
    };

    this.createList = this.createList.bind(this);
    this.removeList = this.removeList.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem('Todos')) {
      let todos = JSON.parse(sessionStorage.getItem('Todos'));
      this.setState(todos);
    }

    else
      sessionStorage.setItem('Todos', JSON.stringify(this.state));
  }

  componentDidUpdate() {
    sessionStorage.setItem('Todos', JSON.stringify(this.state));
  }

  createList() {
    this.setState(pvStt => {
      let newLists = pvStt.lists;

      newLists.push({
        key: UniqID(),
        name: `Tasklist ${pvStt.lastNumberedList + 1}`
      });

      return {
        selectedList: newLists.length - 1,
        lists: newLists,
        lastNumberedList: pvStt.lastNumberedList + 1
      }
    });
  }

  removeList(id) {
    this.setState(pvStt => {
      let newLists = pvStt.lists.filter(item => id !== item.key);

      sessionStorage.removeItem(`${id}`);
      return { lists: newLists, selectedList: newLists.length - 1 };
    });
  }

  render() {
    return (
      <Layout title={this.state.pageTitle}>
        <h1>To-do Lists</h1>

        {
          this.state.lists.length !== 0 && (
            <select
              value={this.state.selectedList}
              onChange={event => this.setState({ selectedList: +event.target.value })}
            >
              {
                this.state.lists.map((item, index) => {
                  return (
                    <option key={UniqID()} value={index}>
                      {item.name}
                    </option>
                  )
                })
              }
            </select>
          )
        }

        <div className="todo-lists">
          {
            this.state.lists.length !== 0 ? (
              <TodoList
                key={this.state.lists[this.state.selectedList].key}
                id={this.state.lists[this.state.selectedList].key}
                name={this.state.lists[this.state.selectedList].name}
                removeHandler={this.removeList}
              />
            ) : (
              <p>You have not added any tasklists yet.</p>
            )
          }
        </div>

        <button onClick={this.createList}>Add List</button>
      </Layout>
    )
  }
}

export default Todos;
