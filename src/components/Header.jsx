import { useRef, useState } from 'react'
import Btn from './utils/Btn'
import { headerIcons } from './utils/Icons'
import { UseAppContext } from '../context/AppContext'
import { fetchFromAPI } from '../utils/FetchFromAPI'
import { useEffect } from 'react'

const {
  AiOutlineMenu,
  AiFillYoutube,
  AiOutlineSearch,
  AiOutlineVideoCamera,
  AiOutlineBell,
  AiOutlineArrowLeft,
} = headerIcons

const Header = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    searchQuery,
    setVideosArr,
    setSelectedCategory,
    isLoading,
    setIsLoading,
   setSearchFound,
  } = UseAppContext()
  const [isFullWidthSearchOpen, setIsFullWidthSearchOpen] = useState(false)
  const inputSearchRef = useRef('')

  useEffect(() => {
    inputSearchRef.current.value = ''
  }, [searchQuery])

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setSelectedCategory('all')
    window.history.replaceState(
      { additionalInformation: 'updated search' },
      'Search Videos',
      `http://localhost:5173/search/?query=${inputSearchRef.current.value
        ?.split(' ')
        .join('&')}`
    )
    fetchFromAPI(
      `search/?query=${inputSearchRef.current.value?.split(' ').join('%')}`
    )
      .then((data) => {
        setVideosArr(data?.videos)
        if(data?.detail){setSearchFound(false)}
        else{ setSearchFound(true)}
      })
      .then(() => setIsLoading(false))
  }

  return (
    <>
      {isLoading && (
        <div aria-label="loadingBar" className="animated-gradient">
          {' '}
        </div>
      )}
      <div
        aria-label="Header"
        className="flex items-center justify-between gap-2 p-2 max-sm:p-1">
        <div
          className={`${
            isFullWidthSearchOpen ? 'max-[660px]:hidden ' : ''
          } flex flex-grow-[2] items-center  justify-start gap-2  max-md:flex-grow-[5]  max-sm:flex-grow-[none]`}>
          <Btn
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            name="menu"
            btntype={'button'}>
            <AiOutlineMenu
              className=" max-sm:scale-[0.92]"
              size={22}
              color="#fff"
            />
          </Btn>
          <Btn
            to="/"
            name="youtubeIcon"
            btntype={'iconWithLink'}
            className="text-lg font-semibold text-white max-sm:text-base">
            <AiFillYoutube
              className=" max-sm:scale-[0.92]"
              size={34}
              fill="red"
            />
            &nbsp;YouTube
          </Btn>
        </div>
        <div
          className={`${
            isFullWidthSearchOpen ? 'max-sm:block  ' : 'max-[660px]:hidden'
          } min-[660px]:hidden`}>
          <Btn
            onClick={() => {
              setIsFullWidthSearchOpen(false)
            }}
            name="arrowLeft"
            btntype={'button'}>
            <AiOutlineArrowLeft
              className=" max-sm:scale-[0.92]"
              size={22}
              color="#fff"
            />
          </Btn>
        </div>
        <form
          onSubmit={handleSubmit}
          className={
            `${
              isFullWidthSearchOpen
                ? ' max-[660px]:flex-grow-1 max-[660px]:pl-2 max-[660px]:pr-2'
                : 'max-[660px]:hidden'
            }` +
            ' flex h-10 w-min flex-grow-[3]  items-center max-md:flex-grow-[10] max-sm:flex-grow-[none]'
          }>
          <input
            ref={inputSearchRef}
            id="searchBar"
            className="focus: h-full w-[90%] rounded-s-full border border-neutral-400 bg-neutral-600/[0.5] p-2 pl-4 text-white placeholder:text-white/[0.5] focus:border-sky-600 focus:outline-none"
            btntype="text"
            placeholder="Search"
            autoComplete="true"
          />
          <Btn
            to={`/search/${inputSearchRef.current.value?.split(' ').join('&')}`}
            type={'submit'}
            name="formSearch"
            btntype={'iconWithLink'}
            className="h-full rounded-e-full border border-neutral-400 bg-neutral-600/[0.5] pl-3 pr-3">
            <AiOutlineSearch
              className=" max-sm:scale-[0.92]"
              size={22}
              color="#fff"
            />
          </Btn>
        </form>
        <div
          className={`${
            isFullWidthSearchOpen ? 'max-[660px]:hidden' : ''
          } flex  flex-grow-[2] items-center  justify-end gap-2 max-md:flex-grow-[5]  max-sm:flex-grow-[none]`}>
          <Btn
            onClick={() => {
              setIsFullWidthSearchOpen(true)
            }}
            className=" min-[660px]:hidden"
            name="search"
            btntype={'button'}>
            <AiOutlineSearch
              className=" max-sm:scale-[0.92]"
              size={22}
              color="#fff"
            />
          </Btn>
          <Btn name="create-video" btntype={'button'}>
            <AiOutlineVideoCamera
              className=" max-sm:scale-[0.92]"
              size={22}
              color="#fff"
            />
          </Btn>
          <Btn name="notisfications" btntype={'button'}>
            <AiOutlineBell
              className=" max-sm:scale-[0.92]"
              size={22}
              color="#fff"
            />
          </Btn>
          <Btn
            name="avatar"
            btntype={'iconWithoutLink'}
            className=" h-8 w-8 rounded-full bg-purple-900 text-sm text-white max-sm:h-[25px] max-sm:w-[25px]">
            V
          </Btn>
        </div>
      </div>
    </>
  )
}

export default Header
