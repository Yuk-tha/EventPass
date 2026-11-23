
import { ArrowUpRight } from 'lucide-react'

type CategoryCardProps = {
  name: string
  emoji: string
  description: string
  onClick: () => void
}

function CategoryCard({
  name,
  emoji,
  description,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      className="category-card"
      onClick={onClick}
      aria-label={`Explore ${name} events`}
    >
      <span className="category-emoji">{emoji}</span>

      <h3>{name}</h3>

      <p className="category-description">
        {description}
      </p>

      <ArrowUpRight size={19} className="category-card-arrow" />
    </button>
  )
}

export default CategoryCard
