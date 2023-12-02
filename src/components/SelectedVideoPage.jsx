import { useState } from 'react'

import BigVideoCard from './utils/BigVideoCard'
import CategoriesSlider from './utils/CategoriesSlider'
import VideoCard from './utils/VideoCard'
import { fetchFromAPI } from '../utils/FetchFromAPI'
import { useEffect } from 'react'
import { UseAppContext } from '../context/AppContext'

const SelectedVideoPage = () => {
  const {
    selectedVideoId,
    isSidebarOpen,
    videosArr,
    setSelectedVideoId,
    setSearchQuery,
    isLoading,
    setIsLoading,
    searchFound,
  } = UseAppContext()
  const [selectedVideo, setSelectedVideo] = useState({})

  useEffect(() => {
    setIsLoading(true)
    fetchFromAPI(`video/details?video_id=${selectedVideoId}`)
      .then((data) => {
        setSelectedVideo(data)
      })
      .then(() => setIsLoading(false))
  }, [selectedVideoId])

  return (
    <>
      {isLoading && (
        <div aria-label="loadingBar" className="animated-gradient"> </div>
      )}
      <div className="grid grid-cols-[70%_30%] gap-5 max-lg:flex max-lg:flex-col max-lg:gap-8">
        <div className={`${!isSidebarOpen && ' xl:ml-10'} max-xl:ml-5`}>
          <BigVideoCard
            className={'lg:h-max'}
            videoId={selectedVideo.video_id}
            channelName={selectedVideo?.author}
            description={selectedVideo?.description}
            likes={'Like'}
            subscribersCount={'S'}
            title={selectedVideo?.title}
            uploadTime={selectedVideo?.published_time}
            views={selectedVideo?.number_of_views}
            key={selectedVideo?.video_id + 'lgvd'}
          />
        </div>
        <div className=" max-xl:ml-5">
          <CategoriesSlider />
          {!searchFound && (
          <div className=" text-center text-lg text-white mt-10">
            Search Query Not Found
          </div>
        )}
          <div className="grid grid-flow-row gap-2">
            {videosArr?.map((obj, i) => {
              return (
                <VideoCard
                  onClick={() => {
                    setSelectedVideoId(obj.video_id)
                    setSearchQuery(' ')
                  }}
                  videoId={obj.video_id}
                  channelName={obj.author}
                  title={obj.title}
                  uploadTime={obj.published_time}
                  thumbnail={obj.thumbnails[0].url}
                  videoLength={obj.video_length}
                  views={obj.number_of_views}
                  description={obj.description}
                  displayType={'colView'}
                  key={obj.video_id + i + 'vcdd'}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectedVideoPage
