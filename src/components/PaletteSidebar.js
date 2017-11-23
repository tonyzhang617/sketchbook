import React, { Component } from 'react';
import { Segment, Sidebar, Form, Accordion, Icon, Checkbox } from 'semantic-ui-react';
import { LINE, RECTANGLE, ELLIPSE } from '../enums';
import '../stylesheets/Sidebar.css';

export default class PaletteSidebar extends Component {
  render() {
    const { shapeSelected, colorSelected, lineParams, rectParams, ellipseParams } = this.props;
    const { setParam, setShapeParam } = this.props;
    const checkmark = (
      <Icon
        name='checkmark'
        color='green'
      />
    );
    const dropdown = (
      <Icon
        name='dropdown'
      />
    );

    const sidebar = (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={ Form } width='wide' icon='labeled' visible>
          <Accordion styled exclusive>
            <Accordion.Title
              active={ shapeSelected === LINE }
              index={0}
              onTouchTap={ e => {
                setParam('shapeSelected', LINE);
              }}
            >
              { shapeSelected === LINE ? checkmark : dropdown }
              Line
            </Accordion.Title>
            <Accordion.Content
              active={ shapeSelected === LINE }
              className='shape-type'
            >
              <Checkbox
                label={{ children: 'Continuous' }}
                onChange={ e => {
                  setShapeParam(LINE, 'continuous', !lineParams['continuous']);
                }}
              />
              <Checkbox
                label={{ children: 'Curved' }}
                onChange={ e => {
                  setShapeParam(LINE, 'curved', !lineParams['curved']);
                }}
              />
            </Accordion.Content>

            <Accordion.Title
              active={ shapeSelected === RECTANGLE }
              index={1}
              onTouchTap={ e => {
                this.props.setParam('shapeSelected', RECTANGLE);
              }}
            >
              { shapeSelected === RECTANGLE ? checkmark : dropdown }
              Rectangle
            </Accordion.Title>
            <Accordion.Content
              active={ shapeSelected === RECTANGLE }
              className='shape-type'
            >
              <Checkbox
                label={{ children: 'Square' }}
                onChange={ e => {
                  setShapeParam(RECTANGLE, 'square', !rectParams['square']);
                }}
              />
            </Accordion.Content>

            <Accordion.Title
              active={ shapeSelected === ELLIPSE }
              index={2}
              onTouchTap={ e => {
                setParam('shapeSelected', ELLIPSE);
              }}
            >
              { shapeSelected === ELLIPSE ? checkmark : dropdown }
              Ellipse
            </Accordion.Title>
            <Accordion.Content
              active={ shapeSelected === ELLIPSE }
              className='shape-type'
            >
              <Checkbox
                label={{ children: 'Circle' }}
                onChange={ e => {
                  setShapeParam(ELLIPSE, 'circle', !ellipseParams['circle']);
                }}
              />
            </Accordion.Content>
          </Accordion>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            {this.props.content}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );

    return sidebar;
  }
}
