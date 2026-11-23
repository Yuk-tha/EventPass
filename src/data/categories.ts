
export type Category = {
  name: string
  emoji: string
  description: string
}

export const categories: Category[] = [
  {
    name: 'Music',
    emoji: '🎵',
    description: 'Live concerts and music experiences',
  },
  {
    name: 'Workshops',
    emoji: '🎨',
    description: 'Learn, create and explore new skills',
  },
  {
    name: 'Nightlife',
    emoji: '🌙',
    description: 'Unforgettable nights and parties',
  },
  {
    name: 'Arts & Culture',
    emoji: '🎭',
    description: 'Art, creativity and cultural events',
  },
  {
    name: 'Technology',
    emoji: '💻',
    description: 'Explore innovation and technology',
  },
  {
    name: 'Sports',
    emoji: '🏆',
    description: 'Sports events and competitions',
  },
]
