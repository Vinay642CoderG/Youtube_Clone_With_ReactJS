import { UseAppContext } from '../context/AppContext'
import LongvideoCard from './utils/LongVideoCard'

const SearchResults = () => {
  const { videosArr, setSelectedVideoId , setSearchQuery, searchFound, } = UseAppContext()
  return (
    <div className=" lg:mx-auto lg:w-[80%]">
      <div className=" order-2 grid grid-flow-row gap-4">
      {!searchFound && (
          <div className=" text-center text-lg text-white mt-10">
            Search Query Not Found
          </div>
        )}
        {videosArr?.map((obj, i) => {
          return (
            <LongvideoCard
              onClick={() => {
                setSelectedVideoId(obj.video_id)
                setSearchQuery(' ')
              }}
              videoId={obj.video_id}
              channelName={obj.author}
              thumbnail={obj.thumbnails[0].url}
              title={obj.title}
              uploadTime={obj.published_time}
              videoLength={obj.video_length}
              views={obj.number_of_views}
              description={obj.description}
              key={obj.video_id + i + 'lgvd'}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SearchResults
