import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { AppContextProvider } from './context/AppContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideosWrapper from './components/VideosWrapper'

const ContentPage = lazy(() => import('./components/ContentPage'))
const SearchResults = lazy(() => import('./components/SearchResults'))
const SelectedVideoPage = lazy(() => import('./components/SelectedVideoPage'))

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContent, setSelectedContent] = useState('home')
  const [videosArr, setVideosArr] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVideoId, setSelectedVideoId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchFound, setSearchFound] = useState(false)
  return (
    <BrowserRouter>
      <AppContextProvider
        value={{
          isSidebarOpen,
          setIsSidebarOpen,
          selectedCategory,
          setSelectedCategory,
          selectedContent,
          setSelectedContent,
          selectedVideoId,
          setSelectedVideoId,
          videosArr,
          setVideosArr,
          searchQuery,
          setSearchQuery,
          isLoading,
          setIsLoading,
          searchFound,
          setSearchFound,
        }}>
        <div className="  flex max-h-screen flex-col gap-4 bg-black">
          <Header />
          <div className=" grid grid-cols-[auto,1fr] overflow-auto">
            <Sidebar />
            <VideosWrapper>
              <Suspense
                fallback={
                  <div aria-label="loadingBar" className="animated-gradient">
                    {' '}
                  </div>
                }>
                <Routes>
                  <Route path="/" element={<ContentPage />} />
                  <Route path="/:selectedContent" element={<ContentPage />} />
                  <Route
                    path="/search/:searchTerm"
                    element={<SearchResults />}
                  />
                  <Route path="/video/:id" element={<SelectedVideoPage />} />
                  <Route path="*" element={<h1>Error: No Vidoes found</h1>} />
                </Routes>
              </Suspense>
            </VideosWrapper>
          </div>
        </div>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
