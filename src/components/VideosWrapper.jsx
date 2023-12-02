import { UseAppContext } from "../context/AppContext"

const VideosWrapper = ({ children }) => {
    const { isSidebarOpen, selectedCategory, setSelectedCategory, selectedContent, } = UseAppContext()
  return (
    <div
      className={`${
        isSidebarOpen ? 'min-[1326px]:left-[232px]' : 'min-[1326px]:left-0'
      } bottom-0 left-[10px] right-0 top-[60px]   flex flex-col gap-4 overflow-y-auto overflow-x-hidden bg-black p-1 text-white max-[1326px]:left-0 max-sm:top-[45px]`}>
      <div
        aria-label="video wrapper"
        className="customScrollbar flex flex-col gap-10 overflow-y-scroll pl-5 pr-5 max-sm:pl-5">
        {children}
      </div>
    </div>
  )
}

export default VideosWrapper
