
export type EventItem = {
  id: number
  title: string
  category: string
  date: string
  location: string
  price: number
  image: string
  color: string
}

export const events: EventItem[] = [
  {
    id: 1,
    title: 'Beyond The Sound',
    category: 'Music',
    date: 'DEC 18, 2026',
    location: 'Chennai, India',
    price: 899,
    image: 'photo-1492684223066-81342ee5ff30',
    color: 'pink',
  },
  {
    id: 2,
    title: 'Creative Minds',
    category: 'Workshops',
    date: 'DEC 22, 2026',
    location: 'Coimbatore, India',
    price: 499,
    image: 'photo-1516321318423-f06f85e504b3',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Neon Nights',
    category: 'Nightlife',
    date: 'DEC 27, 2026',
    location: 'Bangalore, India',
    price: 1299,
    image: 'photo-1470229722913-7c0e2dbbafd3',
    color: 'blue',
  },
  {
    id: 4,
    title: 'Canvas & Culture',
    category: 'Arts & Culture',
    date: 'JAN 10, 2027',
    location: 'Chennai, India',
    price: 599,
    image: 'photo-1513364776144-60967b0f800f',
    color: 'pink',
  },
  {
    id: 5,
    title: 'FutureTech Summit',
    category: 'Technology',
    date: 'JAN 16, 2027',
    location: 'Coimbatore, India',
    price: 799,
    image: 'photo-1519389950473-47ba0277781c',
    color: 'purple',
  },
  {
    id: 6,
    title: 'City Sports Fest',
    category: 'Sports',
    date: 'JAN 24, 2027',
    location: 'Bangalore, India',
    price: 699,
    image: 'photo-1461896836934-ffe607ba8211',
    color: 'blue',
  },
]
