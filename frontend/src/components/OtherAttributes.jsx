import React from 'react'
import { capAllLettersFunc } from '../hooks/capAllLetter'

const OtherAttributes = (props) => {
    const {selectedAttribute, setSelectedAttribute, value} = props
    return (
        <>
            <p className='size-color-price'>{capAllLettersFunc(value.name)}:</p>
            <div className='flex mt-20'>
                {value.items.map(item => {
                    return (
                        <div
                            key={item.id}
                            onClick={(e) => setSelectedAttribute({ ...selectedAttribute, [value.name]: `${e.target.innerHTML}` })}
                            style={{ background: selectedAttribute[value.name] === item.value ? '#1D1F22' : '', color: selectedAttribute[value.name] === item.value ? '#fff' : '#000' }}
                            className='size-boxes relative'>{item.value}
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default OtherAttributes