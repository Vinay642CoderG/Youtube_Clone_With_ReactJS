const CategoryBtn = ({ category, isSelected = false,onClick }) => {
  return (
    <button
      value={category}
      onClick={onClick}
      data-selected={false}
      className={`${
        isSelected
          ? 'bg-white text-black'
          : 'bg-neutral-600/[0.5] text-white hover:bg-neutral-600/[0.8]'
      } w-max rounded-lg px-2 py-1 capitalize max-sm:text-sm`}>
      {category}
    </button>
  )
}

export default CategoryBtn
