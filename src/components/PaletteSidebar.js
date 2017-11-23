import React, { Component } from 'react';
import { Segment, Sidebar, Form, Accordion, Icon, Checkbox } from 'semantic-ui-react';
import { LINE, RECTANGLE, ELLIPSE } from '../enums';

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
          <Accordion styled>
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
            <Accordion.Content active={ shapeSelected === LINE }>
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
            <Accordion.Content active={ shapeSelected === RECTANGLE }>
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
            <Accordion.Content active={ shapeSelected === ELLIPSE }>
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

    // return (
    //   <Sidebar.Pushable as={Segment}>
    //     <Sidebar as={ Form } width='wide' icon='labeled' visible>
    //       <Accordion>
    //         <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
    //           <Icon
    //             name='checkmark'
    //             color='green'
    //           />
    //           What is a dog?
    //         </Accordion.Title>
    //         <Accordion.Content active={activeIndex === 0}>
    //           <p>
    //             A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
    //             {' '}welcome guest in many households across the world.
    //           </p>
    //         </Accordion.Content>
    //
    //         <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
    //           <Icon name='dropdown' />
    //           What kinds of dogs are there?
    //         </Accordion.Title>
    //         <Accordion.Content active={activeIndex === 1}>
    //           <p>
    //             There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
    //             {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
    //           </p>
    //         </Accordion.Content>
    //
    //         <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
    //           <Icon name='dropdown' />
    //           How do you acquire a dog?
    //         </Accordion.Title>
    //         <Accordion.Content active={activeIndex === 2}>
    //           <p>
    //             Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
    //           </p>
    //           <p>
    //             A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
    //             {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
    //             {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
    //           </p>
    //         </Accordion.Content>
    //       </Accordion>
    //     </Sidebar>
    //     <Sidebar.Pusher>
    //       <Segment basic>
    //         {this.props.content}
    //       </Segment>
    //     </Sidebar.Pusher>
    //   </Sidebar.Pushable>
    // );

    // return (
    //   <Accordion>
    //     <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
    //       <Icon
    //         name='checkmark'
    //         color='green'
    //       />
    //       What is a dog?
    //     </Accordion.Title>
    //     <Accordion.Content active={activeIndex === 0}>
    //       <p>
    //         A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
    //         {' '}welcome guest in many households across the world.
    //       </p>
    //     </Accordion.Content>
    //
    //     <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
    //       <Icon name='dropdown' />
    //       What kinds of dogs are there?
    //     </Accordion.Title>
    //     <Accordion.Content active={activeIndex === 1}>
    //       <p>
    //         There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
    //         {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
    //       </p>
    //     </Accordion.Content>
    //
    //     <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
    //       <Icon name='dropdown' />
    //       How do you acquire a dog?
    //     </Accordion.Title>
    //     <Accordion.Content active={activeIndex === 2}>
    //       <p>
    //         Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
    //       </p>
    //       <p>
    //         A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
    //         {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
    //         {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
    //       </p>
    //     </Accordion.Content>
    //   </Accordion>
    // );
  }
}
