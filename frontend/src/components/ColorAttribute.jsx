import React from 'react'
import { capAllLettersFunc } from '../hooks/capAllLetter'

const ColorAttribute = (props) => {
    const {selectedAttribute, setSelectedAttribute, value} = props
    return (
        <>
            <p className='size-color-price'>{capAllLettersFunc(value.name)}:</p>
            <div className='flex mt-20'>
                {value.items.map(item => {
                    return (
                        <div
                            onClick={(e) => setSelectedAttribute({ ...selectedAttribute, [value.name]: `${e.target.innerHTML}` })}
                            key={item.id}
                            className='color-boxes'
                            style={{ border: Object.values(selectedAttribute).includes(item.value) ? '1px solid #5ECE7B' : '1px solid #D3D2D5', background: `${item.value}`, color: 'transparent' }}>{item.value}
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default ColorAttribute