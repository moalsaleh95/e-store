import React, { Component } from 'react';
import { capAllLettersFunc } from '../hooks/capAllLetter';

class ColorAttribute extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e) {
    const { selectedAttribute, setSelectedAttribute, value } = this.props;
    setSelectedAttribute({ ...selectedAttribute, [value.name]: `${e.target.innerHTML}` });
  }

  render() {
    const { value, selectedAttribute } = this.props;
    return (
      <>
        <p className='size-color-price'>{capAllLettersFunc(value.name)}:</p>
        <div className='flex mt-20'>
          {value.items.map(item => (
            <div
              onClick={this.handleItemClick}
              key={item.id}
              className='color-boxes'
              style={{
                border: Object.values(selectedAttribute).includes(item.value) ? '1px solid #5ECE7B' : '1px solid #D3D2D5',
                background: `${item.value}`,
                color: 'transparent'
              }}
            >
              {item.value}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ColorAttribute;
