import React, {useState} from 'react';
import './App.css';
import Slider from './Slider';
import SidebarItem from './SidebarItem';

const DEFAULT_OPTIONS = [
  {
    name: 'BRIGHTNESS',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%' 
  },
  {
    name: 'CONTRAST',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%' 
  },
  {
    name: 'SATURATION',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%' 
  },
  {
    name: 'GRAYSCALE',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%' 
  },
  {
    name: 'SEPIA',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%' 
  },
  {
    name: 'HUE ROTATE',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg' 
  },
  {
    name: 'BLUR',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px' 
  }
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

  function handleSliderChange({ target }) {
    setOptions(prevOption => {
        return prevOption.map((option, index) => {
          if (index !== selectedOptionIndex) return option
          return { ...option, value: target.value }
        })
      }
    )
  }

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ')}
  }

  return(
    <div className= 'container'>

      <div className= 'sidebar'>
        <h1 className= 'logo'>Ps</h1>
        {options.map((option, index) => {
          return(<SidebarItem
            key = {index}
            name = {option.name}
            active = {index === selectedOptionIndex}
            handleClick={ () => setSelectedOptionIndex(index) }
            />
          )
        })}
      </div>

      <div className='main-image' style={getImageStyle()}/>

      <Slider
        min = {selectedOption.range.min}
        max = {selectedOption.range.max}
        value = {selectedOption.value}
        handleChange = { handleSliderChange }
      />

    </div>
  )
}

export default App;