import { Link } from 'react-router-dom'

const LongTab = ({ children, to = '', value, selected }) => {
  return (
    <Link to={to}>
      <button
        value={value}
        className={`${
          selected && 'bg-white/[0.2]'
        } flex w-full items-center justify-start gap-6 rounded-xl p-2 font-semibold text-white hover:bg-white/[0.2] max-sm:gap-3 max-sm:text-sm`}
        type="button">
        {children}
      </button>
    </Link>
  )
}

export default LongTab
