import { useState } from 'react'
import Btn from './Btn'
import { longvideoCardIcons } from './Icons'
import { Link } from 'react-router-dom';

const {
  IoMdCheckmarkCircle,
  HiOutlineDotsVertical
} = longvideoCardIcons;

const LongvideoCard = ({
  url='',
  videoId,
  title,
  views,
  uploadTime,
  videoLength,
  channelName,
  description,
  thumbnail,
  onClick,
}) => {
  const [hoverActive, setHoveActive] = useState(false)
  let formattedViews = ''
  function clacViews(views) {
    let formattedViews = ''
    if (views < 1000 && views >= 0) {
      formattedViews = `${views} views`
    } else if (views >= 1000 && views < 1000000) {
      formattedViews = `${views / 1000}K views`
    } else if (views >= 1000000) {
      formattedViews = `${views / 1000000}M views`
    }
    return formattedViews
  }
  return (
    <div className={` flex items-start gap-4 justify-center cursor-pointer`}>
      <div className=" relative w-1/2">
        <Link to={`/video/${videoId}`} onClick={onClick}>
        <video className="rounded-[3%] w-full h-full" src={url} poster={thumbnail}/>
        <span className=" absolute bottom-1 right-1 rounded-md bg-black/[0.7] p-[1px_4px] text-[14px] text-white">
          {videoLength}
        </span>
        </Link>
      </div>
      <div
        className=" flex flex-col justify-between w-[60%]"
        onMouseOver={() => setHoveActive(true)}
        onMouseLeave={() => setHoveActive(false)}>
        <span className="flex justify-between items-start text-xl font-normal text-white max-sm:overflow-hidden max-sm:line-clamp-1 max-sm:text-xl relative">
          <Link to={`/video/${videoId}`} onClick={onClick}>
          {title}
          <span className='sm:hidden'>...</span>
          </Link>
          <Btn
            className={`${!hoverActive && 'md:hidden'} absolute right-0 top-0`}
            btntype={'iconWithoutLink'}
            name="vidoe_options">
            <HiOutlineDotsVertical size={18} fill="white" />
          </Btn>
        </span>
        <span className=" text-xs font-medium text-neutral-400">
          {clacViews(views)}&nbsp;•&nbsp;{uploadTime}
        </span>
        <span className=" my-2 flex items-center gap-1 text-xs font-semibold text-neutral-400">
          <span className=" h-[22px] w-[22px] rounded-full bg-blue-700 text-white text-[8px] flex justify-center items-center p-4" alt="channel logo" >
            LOGO
          </span>
          {channelName} <IoMdCheckmarkCircle size={14} fill="gray" />
        </span>
        <p className="  text-xs font-medium text-neutral-400 overflow-hidden line-clamp-1 max-lg:line-clamp-2">{description}....</p>
      </div>
    </div>
  )
}

export default LongvideoCard
