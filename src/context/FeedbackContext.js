import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData)

  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const finishEditFeedback = () => {
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)))
    finishEditFeedback()
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want  to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
      finishEditFeedback()
    }
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        finishEditFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
