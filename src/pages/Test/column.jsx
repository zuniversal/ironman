import React, { Component } from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

const Container = <div className={'columnCntainer'}></div>;

const Title = <div className={'columnCntainer'}></div>;

const TaskList = <div className={'TaskList'}></div>;

export default class Column extends Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id} type="TASK">
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
