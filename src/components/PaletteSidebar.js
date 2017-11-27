import React, { Component } from 'react';
import { Segment, Sidebar, Table, Accordion, Button, Icon, Checkbox } from 'semantic-ui-react';
import { LINE, RECTANGLE, ELLIPSE, POLYGON } from '../enums';
import colors from '../enums/colors';
import '../stylesheets/Sidebar.css';

export default class PaletteSidebar extends Component {
  componentDidUpdate() {
    if (this.props.isDownloadReady) {
      this.dlLink.click();
      this.props.finishDownload();
    }
  }

  render() {
    const { shapeSelected, colorSelected, lineParams, rectParams, ellipseParams, polygonParams } = this.props;
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
      <div
        id='sidebar'
        className='shadow'
        style={{
          height: this.props.windowHeight
        }}
      >
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
                if (lineParams['continuous']) {
                  setShapeParam(LINE, 'continuous', false);
                  setShapeParam(LINE, 'curved', false);
                } else {
                  setShapeParam(LINE, 'continuous', true);
                }
              }}
            />
            <Checkbox
              label={{ children: 'Curved' }}
              disabled={ this.props.lineParams['continuous'] ? false : true }
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

          <Accordion.Title
            active={ shapeSelected === POLYGON }
            index={2}
            onTouchTap={ e => {
              setParam('shapeSelected', POLYGON);
            }}
          >
            { shapeSelected === POLYGON ? checkmark : dropdown }
            Polygon
          </Accordion.Title>
          <Accordion.Content
            active={ shapeSelected === POLYGON }
            className='shape-type'
          >
            <Checkbox
              label={{ children: 'Curved' }}
              onChange={ e => {
                setShapeParam(POLYGON, 'curved', !polygonParams['curved']);
              }}
            />
          </Accordion.Content>
        </Accordion>

        <Segment>
          {
            colors.map(color => {
              return (
                <Button
                  key={ color.name }
                  className='btn-color'
                  icon='paint brush'
                  id='color-selected'
                  style={{
                    color: this.props.colorSelected===color.name ? color.inverted : color.name,
                    backgroundColor: color.name
                  }}
                  onTouchTap={() => {
                    this.props.setParam('colorSelected', color.name);
                  }}
                  circular
                />
              );
            })
          }
        </Segment>

        <Segment>
          <Button
            content='Download'
            icon='save'
            labelPosition='left'
            loading={ this.props.isPreparingDownload ? true : false }
            onTouchTap={e => {
              this.props.requestDownload();
            }}
          />
          <a
            href={ this.props.isDownloadReady ? this.props.downloadData : null }
            ref={ dlLink => this.dlLink = dlLink }
            download='sketch.png'
          />
        </Segment>
      </div>
    );

    return sidebar;
  }
}
