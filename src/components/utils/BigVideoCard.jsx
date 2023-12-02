import ReactPlayer from 'react-player'
import { bigVideoCardIcons } from './Icons'

const {
  IoMdCheckmarkCircle,
  RiShareForwardFill,
  SlOptions,
  AiOutlineDislike,
  AiOutlineLike
} = bigVideoCardIcons;
const BigVideoCard = ({
  videoId,
  title,
  channelName,
  subscribersCount,
  likes,
  description,
  views,
  uploadTime,
  className,
}) => {
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
    <div className={`${className} flex flex-col gap-3`}>
      <div className=' aspect-[16/9] '>
      <ReactPlayer  playing={true} width={"100%"} height={"100%"} url={`https://www.youtube.com/watch?v=${videoId}`} controls={true} />
      </div>
      <h1 className=" text-left text-lg font-bold text-white">{title}</h1>
      <div className=" flex items-center justify-between gap-5 flex-wrap">
        <div className=' flex items-center'>
          <span
            className=" h-[45px] w-[45px] rounded-full cursor-pointer text-xs bg-blue-700 text-white font-bold flex items-center justify-center"
            alt={channelName}
          >LOGO</span>
          <div className='ml-[12px] mr-[24px]'>
            <h2 className=' text-base text-white font-semibold line-clamp-1 flex items-center gap-[5px] cursor-pointer'>
              {channelName} <IoMdCheckmarkCircle className=' cursor-default' size={14} fill="gray" />
            </h2>
            <span className=' text-[14px] text-gray-500  '>{subscribersCount} subscribers</span>
          </div>
          <button className=' px-3 py-2 rounded-full text-black font-normal bg-white'>Subscribe</button>
        </div>
        <div className=' flex items-center gap-2'>
          <div className=' rounded-full bg-neutral-600/[0.5] hover:bg-neutral-600/[0.8] flex items-center'>
            <button className=' hover:bg-white/20 text-base border-r border-white rounded-tl-full rounded-bl-full p-2 flex gap-2'>
              <AiOutlineLike size={22} color='white' className=' max-sm:scale-[0.92]' />
              {likes}
            </button>
            <button className=' hover:bg-white/20 text-base rounded-tr-full rounded-br-full p-2 flex gap-2'> 
              <AiOutlineDislike size={22} color='white' className=' max-sm:scale-[0.92]' />
            </button>
          </div>
          <button className=' gap-2 p-2 rounded-full  bg-neutral-600/[0.5] hover:bg-neutral-600/[0.8] text-white font-normal text-sm flex items-center'>
            <RiShareForwardFill size={22} color='white' className=' max-sm:scale-[0.92]' />
            Share
          </button>
          <button className=' p-3 bg-neutral-600/[0.5] hover:bg-neutral-600/[0.8] rounded-full'>
            <SlOptions size={16} color='white' className=' max-sm:scale-[0.92]' />
          </button>
        </div>
      </div>
      <div className=' text-white text-sm bg-neutral-600/[0.5] rounded-lg p-2'>
        <h3 className=' flex justify-start items-start gap-2'>
          <span>{clacViews(views)}</span>
          <span>{uploadTime}</span>
        </h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default BigVideoCard
