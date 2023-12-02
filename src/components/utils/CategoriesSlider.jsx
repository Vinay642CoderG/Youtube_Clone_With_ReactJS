import { useEffect, useRef, useState } from 'react'
import Btn from './Btn'
import CategoryBtn from './CategoryBtn'
import { categoriesSliderIcons } from './Icons'
import { UseAppContext } from '../../context/AppContext'
import { fetchFromAPI } from '../../utils/FetchFromAPI'

const { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } =
  categoriesSliderIcons
const scrollXMoveBy = 100

const categories = ['all', 'javascript', 'music', 'mixes', 'databases', 'action thrillers', 'movie musicals', 'audiobook', 'chill-out music', 'chinese cusinie', 'comedy', 'classical music', 'movies', 'recently uploaded']


const CategoriesSlider = () => {
  const {  selectedCategory, setSelectedCategory, setVideosArr, setSearchFound,setIsLoading,} = UseAppContext()
  const [initScrollXPos, setInitScrollXPos] = useState(0)
  const sliderElem = useRef('')
  useEffect(() => {
    function resetScroll() {
      sliderElem.current.scrollTo({ behavior: 'smooth', left: 1 })
    }
    window.addEventListener('resize', resetScroll)
    return () => {
      window.removeEventListener('resize', resetScroll)
    }
  }, [initScrollXPos])
  
  return (
    <div
      id="sliderVertical"
      aria-label="slider-wrapper"
      className=" relative top-0 z-10 mb-6 h-12 bg-black px-5 max-sm:h-8">
      <div
        onScroll={(e) => {
          setInitScrollXPos(e.target.scrollLeft)
        }}
        ref={sliderElem}
        aria-label="allCategoriesSlider"
        className="scrollbarHidden grid h-full w-full grid-flow-col place-items-center gap-3 overflow-y-hidden overflow-x-scroll bg-black transition-transform"
        onClick={(e) => {
          setSelectedCategory(e.target.value)
          setIsLoading(true)
          fetchFromAPI(`search/?query=${e.target.value}`).then((data)=>{
            setVideosArr(data?.videos)
            if(data?.detail){setSearchFound(false)}
        else{ setSearchFound(true)}
          }).then(() => setIsLoading(false))
        }}>
        {selectedCategory &&
          categories.map((val, i) => {
            return (
              <CategoryBtn
                isSelected={
                  selectedCategory.toLowerCase() === val.toLowerCase()
                }
                category={val}
                key={val + i + 'ctgr'}
              />
            )
          })}
      </div>

      <div
        onClick={() => {
          if (initScrollXPos > 0) {
            sliderElem.current.scrollTo({
              behavior: 'smooth',
              left: initScrollXPos - scrollXMoveBy,
            })
            setInitScrollXPos(initScrollXPos - scrollXMoveBy)
          }
        }}
        aria-label="prevBtn"
        className={`${
          initScrollXPos == 0 && 'hidden'
        } absolute left-0 top-0 flex h-full items-center justify-start bg-black shadow-[10px_0px_20px_5px_#000]
      `}>
        <Btn btntype={'button'}>
          <MdOutlineKeyboardArrowLeft size={24} color="#fff" />
        </Btn>
      </div>
      <div
        onClick={() => {
          let maxScrollLeft =
            sliderElem.current.scrollWidth - sliderElem.current.clientWidth
          if (initScrollXPos < maxScrollLeft) {
            sliderElem.current.scrollBy({
              behavior: 'smooth',
              left: initScrollXPos + scrollXMoveBy,
            })
            setInitScrollXPos(initScrollXPos + scrollXMoveBy)
          }
        }}
        aria-label="nextBtn"
        className={`${
          initScrollXPos >=
            sliderElem.current.scrollWidth - sliderElem.current.clientWidth &&
          'hidden'
        } absolute right-0 top-0 flex h-full items-center justify-end bg-black shadow-[-10px_0px_20px_5px_#000]`}>
        <Btn onClick={() => {}} btntype={'button'}>
          <MdOutlineKeyboardArrowRight size={24} color="#fff" />
        </Btn>
      </div>
    </div>
  )
}

export default CategoriesSlider
