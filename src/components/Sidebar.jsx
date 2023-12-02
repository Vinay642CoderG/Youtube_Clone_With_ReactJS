import { useEffect, useState } from 'react'
import { UseAppContext } from '../context/AppContext'
import Btn from './utils/Btn'
import { sidebarIcons } from './utils/Icons'
import LongTab from './utils/LongTab'
const {
  AiOutlineMenu,
  AiFillYoutube,
  AiFillHome,
  AiOutlineYoutube,
  AiOutlineFire,
  MdOutlineShoppingBag,
  MdPodcasts,
  IoMusicalNoteOutline,
  FaFilm,
  SiYoutubegaming,
  HiSignal,
  FaRegLightbulb,
  FaRegNewspaper,
  IoTrophyOutline,
  GiHanger,
} = sidebarIcons

const menus_arr = [
  [
    { text: 'Home', icon: <AiFillHome size={26} fill="#fff" />, to: '/', searchValue: 'interests' },
    {
      text: 'Shorts',
      icon: <AiOutlineYoutube size={26} fill="#fff" />,
      to: '/search/shorts',
      searchValue: 'shorts'
    },
  ],
  [
    {
      text: 'Trending',
      icon: <AiOutlineFire size={26} fill="#fff" />,
      to: '/Trending',
    searchValue: 'trends'},
    {
      text: 'Shopping',
      icon: <MdOutlineShoppingBag size={26} fill="#fff" />,
      to: '/Shopping',
    searchValue: 'shops'},
    {
      text: 'Music',
      icon: <IoMusicalNoteOutline size={26} fill="#fff" />,
      to: '/Music',
    searchValue: 'music'},
    { text: 'Films', icon: <FaFilm size={26} fill="#fff" />, to: '/Films', searchValue: 'films'},
    { text: 'Live', icon: <HiSignal size={26} fill="#fff" />, to: '/Live', searchValue: 'live'},
    {
      text: 'Gaming',
      icon: <SiYoutubegaming size={26} fill="#fff" />,
      to: '/Gaming',
    searchValue: 'games'},
    {
      text: 'News',
      icon: <FaRegNewspaper size={26} fill="#fff" />,
      to: '/News',
    searchValue: 'news'},
    {
      text: 'Sport',
      icon: <IoTrophyOutline size={26} fill="#fff" />,
      to: '/Sport',
    searchValue: 'sports'},
    {
      text: 'Learning',
      icon: <FaRegLightbulb size={26} fill="#fff" />,
      to: '/Learning',
    searchValue: 'learn'},
    {
      text: 'Fashion & beauty',
      icon: <GiHanger size={26} fill="#fff" />,
      to: '/Fashion&beauty',
    searchValue: 'fashion'},
    {
      text: 'Podcasts',
      icon: <MdPodcasts size={26} fill="#fff" />,
      to: '/Podcasts',
    searchValue: 'podcasts'},
  ],
]
const Sidebar = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    selectedContent,
    setSelectedContent,
    setSearchQuery,
  } = UseAppContext()
  function hideSidebar() {
    //hide sidebar after 1326px screen size

    if (window.innerWidth <= 1326) {
      setIsSidebarOpen(false)
    }
    if (window.innerWidth > 1326) {
      setIsSidebarOpen(true)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', hideSidebar)
    hideSidebar()
    return () => {
      window.removeEventListener('resize', hideSidebar)
      hideSidebar()
    }
 }, [setIsSidebarOpen])
  return (
    <>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`${
          !isSidebarOpen && 'max-[1326px]:hidden'
        } absolute left-0 top-0 z-20 h-[100svh] w-[100svw] bg-black/60 min-[1326px]:hidden`}
        aria-label="bg-fade"></div>
      <div
        aria-label="Sidebar"
        className={`${!isSidebarOpen && 'min-[1326px]:hidden'} ${
          isSidebarOpen
            ? 'max-[1326px]:translate-x-0'
            : 'max-[1326px]:translate-x-[-270px] max-sm:translate-x-[-200px]'
        } customScrollbar top-0 z-30 flex h-full w-max flex-col items-center justify-start overflow-y-auto bg-black px-4 pb-2 pt-0 transition-transform ease-in-out max-[1326px]:absolute max-[1326px]:h-full max-sm:w-[200px] max-sm:p-1`}>
        <div
          aria-label="Sidebar-header"
          className=" sticky top-0 flex w-full items-center justify-start gap-2 bg-black py-3 max-sm:gap-0 min-[1326px]:hidden">
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
            className="text-lg font-semibold text-white">
            <AiFillYoutube
              className=" max-sm:scale-[0.92]"
              size={34}
              fill="red"
            />
            &nbsp;YouTube
          </Btn>
        </div>

        <div
          onClick={(e) => {
            const target = e.target
            if (target.getAttribute('type') == 'button') {
              setSelectedContent(target.value.toLowerCase())
              setSearchQuery(' ');
            }
          }}>
          <div className="border-b border-neutral-400 pb-2">
            {menus_arr[0]?.map((obj, i) => {
              return (
                <LongTab
                  to={obj.to}
                  key={obj.text + i + 'lt'}
                  value={obj.searchValue}
                  selected={selectedContent === obj.searchValue.toLowerCase()}>
                  {obj.icon}
                  {obj.text}
                </LongTab>
              )
            })}
          </div>
          <div className="border-b border-neutral-400 pb-2 pt-2">
            {menus_arr[1]?.map((obj, i) => {
              return (
                <LongTab
                  to={obj.to}
                  key={obj.text + i + 'lt'}
                  value={obj.searchValue}
                  selected={
                    selectedContent.toLowerCase() === obj.searchValue.toLowerCase()
                  }>
                  {obj.icon}
                  {obj.text}
                </LongTab>
              )
            })}
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-base text-neutral-400 max-sm:text-[13px] max-sm:text-sm">
            @Designed by Vinay Bhagat
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
