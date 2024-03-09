import PropTypes from 'prop-types'

function FeedbackStats({ feedback }) {
    let avarage = feedback.reduce((acc, item) => {
        return acc + item.rating
    },0) / feedback.length

    avarage = avarage.toFixed(1).replace(/[.,]0$/, '')

    return (
        <div className='feedback-stats'>
          <h4>{feedback.length} Reviews</h4>
          <h4>Avarage Rating: {isNaN(avarage) ? 0 : avarage}</h4>
        </div>
    )
}

FeedbackStats.propTypes = {
    feedback: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
        })
    ),
}

export default FeedbackStats
