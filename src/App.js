import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackData from "./Data/FeedbackData"
import FeedbackForm from "./components/FeedbackForm"

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
        <>
            <Header />
            <div className='container'>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} 
                handleDelete={deleteFeedback} />
            </div>
        </>
    )
}

export default App 