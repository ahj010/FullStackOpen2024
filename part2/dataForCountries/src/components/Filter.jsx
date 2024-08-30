import PropTypes from 'prop-types'

const Filter = ({value, onChange}) =>
    <div>
        find countries <input value={value} onChange={onChange} />
    </div>

export default Filter

Filter.propTypes ={
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
}
