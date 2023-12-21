import React, { Component } from "react";
import { 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    if(e.target.type === "checkbox"){
      value = e.target.checked;
    }
    const activeItem = {...this.state.activeItem, [name]: value};
    this.setState({activeItem});
  };

  render() {
    const { toggle, onSave } = this.props;
    
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Title</Label>
              <Input 
                type="text"
                id="todo-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Description</Label>
              <Input 
                type="text"
                id="todo-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check for="todo-completed">Completed</Label>
                <Input 
                  type="checkbox"
                  id="todo-completed"
                  name="completed"
                  value={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup>
              <Label for="todo-updated_at">updated_at</Label>
              <Input 
                type="text"
                id="todo-updated_at"
                name="updated_at"
                value={this.state.activeItem.updated_at}
                disabled = {true}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
}