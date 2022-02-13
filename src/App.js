import { useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import './styles/main.css'
const data = [
    {name : 'Name Lastname 1', position : 'Position', role : 'Team position', image : '/images/image_1.jpg'},
    {name : 'Name Lastname', position : 'Position', role : 'Team position', image : '/images/image_2.jpg'},
    {name : 'Name Lastname', position : 'Position', role : 'Team position', image : '/images/image_3.jpg'},
    {name : 'Name Lastname', position : 'Position', role : 'Team position', image : '/images/image_4.jpg'},
    {name : 'Name Lastname', position : 'Position', role : 'Team position', image : '/images/image_5.jpg'},
    {name : 'Name Lastname', position : 'Position', role : 'Team position', image : '/images/image_6.jpg'},
]
function App() {
    const _movement = useRef(null)
    const [position, setPosition ] = useState(0)

    async function changePosition(new_position){
        setPosition(new_position)
        _movement.current.style.left = (new_position * 215 * (-1)) + 'px'
        
    }
    async function goLeft(){
        if(position - 1 >= 0)
            changePosition(position - 1)
    }
    async function goRigth(){
        if(position + 1 < data.length)
            changePosition(position + 1)
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => goLeft(),
        onSwipedRight: () => goRigth(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className='main-container'>
            <div className='element-container'>
                    <div {...handlers} className='carousel-container'>
                        <div className='carousel-animation-container'>
                            <div ref={_movement} className='carousel-animation'>    
                                {data.map((item, index)=> (
                                        <div key={`card-${index}`} className='carousel-item-container'>
                                            <div className='carousel-image-container'>
                                                <img src={item.image}></img>
                                            </div>
                                            <p className='carousel-name'>{item.name}</p>
                                            <p className='carousel-role'>{item.role}</p>
                                        </div>
                                ))}
                            </div>
                        </div>
                        <div className='carousel-controls-circles'>
                            {data.map((item, index)=>(
                                <div onClick={()=>changePosition(index)} key={`circle-${index}`} className={(position === index ? 'carousel-selected': 'carousel-circle')}>
                                </div>
                            ))}
                        </div>
                        <div className='carousel-controls'>
                            <button className='carousel-arrow' type='button' onClick={goLeft}>
                                <AiOutlineArrowLeft/>
                            </button>
                            <button className='carousel-arrow' type='button' onClick={goRigth}>
                                <AiOutlineArrowRight/>
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default App
