import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class Board extends Component {
  onBeforeCapture = () => {
    /*...*/
  };

  onBeforeDragStart = () => {
    /*...*/
  };

  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    // the only one that is required
  };

  render() {
    return (
      <React.Fragment>
        <DragDropContext
          onBeforeCapture={this.onBeforeCapture}
          onBeforeDragStart={this.onBeforeDragStart}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <div>Hello world</div>
          <div>Hello world</div>
          <div>Hello world</div>
        </DragDropContext>
      </React.Fragment>
    );
  }
}
