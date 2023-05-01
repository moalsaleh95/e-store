import React, { Component } from 'react';
import { capAllLettersFunc } from '../hooks/capAllLetter';

class ColorAttribute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAttribute: props.selectedAttribute,
            setSelectedAttribute: props.setSelectedAttribute,
            value: props.value,
        }
    }

    render() {
        return (
            <>
                <p className='size-color-price'>{capAllLettersFunc(this.state.value.name)}:</p>
                <div className='flex mt-20'>
                    {this.state.value.items.map(item => {
                        return (
                            <div
                                onClick={(e) => this.state.setSelectedAttribute({ ...this.state.selectedAttribute, [this.state.value.name]: `${e.target.innerHTML}` })}
                                key={item.id}
                                className='color-boxes'
                                style={{ border: Object.values(this.state.selectedAttribute).includes(item.value) ? '1px solid #5ECE7B' : '1px solid #D3D2D5', background: `${item.value}`, color: 'transparent' }}>{item.value}
                            </div>
                        )
                    })
                    }
                </div>
            </>
        )
    }
}

export default ColorAttribute;
