import React, {Component} from 'react';
import Modal from "./Modal";
import axios from "axios";

const todoItems = [
  {
    id: 1,
    title: "Go to school",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel libero at lectus rutrum vestibulum vitae ut turpis. Ut ultricies pulvinar posuere. Nulla rutrum, libero nec pharetra accumsan, enim leo blandit dui, ac bibendum augue dui sed massa.",
    completed: false,
    updated_at: "2023/12/19 15:35:33",
  },
  {
    id: 2,
    title: "Go to bed",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel libero at lectus rutrum vestibulum vitae ut turpis.",
    completed: true,
  },
  {
    id: 3,
    title: "Go to work",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel libero at lectus rutrum vestibulum vitae ut turpis.",
    completed: false,
  },
]

class TodoManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        updated_at: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.error(err))
  };

  toggle = () => {
    this.setState({modal: !this.state.modal});
  }

  handleSubmit = item => {
    this.toggle();
    console.debug("save" + JSON.stringify(item));

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList())
        .catch((err) => console.error(err))
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList())
      .catch((err) => console.error(err))
  }

  handleDelete = item => {
    console.debug("delete" + JSON.stringify(item));

    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList())
      .catch((err) => console.error(err))
  }

  createItem = () => {
    const item = {title: "", description: "", completed: false, updated_at: ""};
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  editItem = (item) => {
    this.setState({activeItem: item, modal: !this.state.modal});
  }

  displayCompleted = status => {
    if(status){
      return this.setState({viewCompleted: true});
    }
    return this.setState({viewCompleted: false});
  };

  // render nav tabs
  renderTablist = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >Incomplete</span>
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >Completed</span>
      </div>
    );
  };


  renderItems = () => {
    const {viewCompleted} = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-secondary"
            onClick={() => this.editItem(item)}
          >Edit</button>
          <button className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >Delete</button>
        </span>
      </li>
    ));
  }

  render() {
    return (
      <main className="container">
        <h1 className='text-white text-uppercase text-center my-4'>Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary"
                  onClick={this.createItem}
                >Add task</button>
              </div>
              {this.renderTablist()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default TodoManager;
