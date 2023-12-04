import { UseAppContext } from '../context/AppContext'
import CategoriesSlider from './utils/CategoriesSlider'
import VideoCard from './utils/VideoCard'
import { fetchFromAPI } from '../utils/FetchFromAPI'
import { useEffect } from 'react'

const ContentPage = () => {
  const {
    selectedContent,
    videosArr,
    setVideosArr,
    setSelectedVideoId,
    setSearchQuery,
    isLoading,
    setIsLoading,
    searchFound,
    setSearchFound,
  } = UseAppContext()
  useEffect(() => {
    setIsLoading(true)
    setSearchQuery(' ')
    fetchFromAPI(`search/?query=${selectedContent}`)
      .then((data) => {
        setVideosArr(data?.videos)
        if(data?.detail){setSearchFound(false)}
        else{ setSearchFound(true)}
      })
      .then(() => setIsLoading(false))
  }, [selectedContent])
  return (
    <>
      {isLoading && (
        <div aria-label="loadingBar" className="animated-gradient">
          {' '}
        </div>
      )}
      <div>
        <CategoriesSlider />
        {!searchFound && (
          <div className=" text-center text-lg text-white mt-10">
            Search Query Not Found
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-3">
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
                displayType={'rowView'}
                key={obj.video_id + i + 'vcdd'}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ContentPage
