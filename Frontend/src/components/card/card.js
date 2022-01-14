import React, { Component }  from 'react';
import './card.css';
class Card extends React.Component {
  render() {
    return <div className="draggable box" draggable={true} >
    <div className="inline"><span>{this.props.data[0]}</span><span><img src={this.props.data[1]} className='cardlogo' /></span></div>
    <div className="price">{this.props.data[2]}</div>
    </div>;
  }
}
 
export default Card;