import { v4 as uuidv4 } from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackData from "./Data/FeedbackData"
import FeedbackForm from "./components/FeedbackForm"
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'
import {FeedbackProvider} from './context/FeedbackContext'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)
    
    // since feedback data is in this file, we need the delete handler to deal with it here.
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={
                            <>
                                <FeedbackForm handleAdd={addFeedback} />
                                <FeedbackStats />
                                <FeedbackList handleDelete={deleteFeedback} />
                            </>
                        }>
                        </Route>
                        <Route path='/about' element={<AboutPage />} />
                    </Routes>

                    <AboutIconLink />
                </div>
            </Router>
        </FeedbackProvider>
    )
}

export default App 