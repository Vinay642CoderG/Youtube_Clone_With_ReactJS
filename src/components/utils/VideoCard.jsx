import { useState } from 'react'
import Btn from './Btn'
import { videoCardIcons } from './Icons'
import { Link } from 'react-router-dom'

const { IoMdCheckmarkCircle, HiOutlineDotsVertical } = videoCardIcons

const VideoCard = ({
  url='',
  videoId,
  title,
  views,
  uploadTime,
  videoLength,
  channelName,
  displayType,
  thumbnail,
  onClick,
}) => {
  const [hoverActive, setHoveActive] = useState(false);
  let formattedViews = ''
  function clacViews(views) {
    let formattedViews = ''
    if (views < 1000 && views >= 0) {
      formattedViews = `${views} views`
    } else if (views >= 1000 && views < 1000000) {
      formattedViews = `${Math.trunc(views / 1000)}K views`
    } else if (views >= 1000000) {
      formattedViews = `${Math.trunc(views / 1000000)}M views`
    }
    return formattedViews
  }
  return (
    <div
      className={`${displayType == 'colView' && 'flex-row'} ${
        displayType == 'rowView' && 'flex-col'
      } ${
        displayType == 'rowView' &&
        'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:scale-[1.03] hover:transition-transform'
      } flex w-full cursor-pointer gap-2`}>
      <div
        className={`${
          displayType == 'colView' &&
          ' h-full max-lg:w-1/4 max-sm:w-1/2 lg:w-11/12'
        } relative`}>
        <Link to={`/video/${videoId}`}>
        <video className={` rounded-lg w-full h-full`} src={`${url}` } poster={thumbnail} onClick={onClick}></video>
        <span
          className={`${
            displayType == 'colView' && 'lg:bottom-12'
          } absolute bottom-1 right-1 rounded-md bg-black/[0.7] p-[1px_4px] text-[14px] text-white`}>
          {videoLength}
        </span>
        </Link>
      </div>
      <div
        className="flex w-full gap-3 relative"
        onMouseOver={() => setHoveActive(true)}
        onMouseLeave={() => setHoveActive(false)}>
        <span
          className={`${
            displayType == 'colView' && 'hidden '
          } h-[35px] w-[35px] p-5 rounded-full bg-blue-600 text-[9px] text-white font-bold flex items-center justify-center
          `}
          alt="channel logo"
        >LOGO</span>
        <div className=" flex flex-grow flex-col" onClick={onClick}>
          <Link to={`/video/${videoId}`} 
            className={`${
              displayType == 'colView' && ' font-bold '
            }  text-base font-normal text-white lg:line-clamp-1`}>
            {title}
          </Link>
          <span
            className={`${displayType == 'colView' && 'text-xs'} ${
              displayType == 'rowView' && 'text-sm'
            } flex gap-1 text-sm font-normal text-neutral-500`}>
            {channelName} <IoMdCheckmarkCircle size={14} fill="gray" />
          </span>
          <span
            className={`${displayType == 'colView' && 'text-xs'} ${
              displayType == 'rowView' && 'text-sm'
            } font-normal text-neutral-500`}>
            {clacViews(views)}&nbsp;•&nbsp;{uploadTime}
          </span>
        </div>
        <Btn
          className={`${!hoverActive && 'md:hidden'} absolute max-lg:top-0 right-0 lg:bottom-0`}
          btntype={'iconWithoutLink'}
          name="vidoe_options">
          <HiOutlineDotsVertical size={18} fill="white" />
        </Btn>
      </div>
    </div>
  )
}

export default VideoCard
