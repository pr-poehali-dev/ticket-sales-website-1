import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'

interface Event {
  id: number
  title: string
  date: string
  venue: string
  price: number
  category: string
  image: string
}

interface Seat {
  id: string
  row: number
  number: number
  status: 'available' | 'selected' | 'sold'
  price: number
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [seats, setSeats] = useState<Seat[]>(generateSeats())
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const events: Event[] = [
    {
      id: 1,
      title: 'Концерт симфонического оркестра',
      date: '29 октября 2025',
      venue: 'Концертный зал',
      price: 2500,
      category: 'Музыка',
      image: 'https://s1.afisha.ru/mediastorage/53/d7/8c07ff7366644248b6d9ddaad753.jpg'
    },
    {
      id: 2,
      title: 'Спектакль "Вишнёвый сад"',
      date: '30 октября 2025',
      venue: 'Драматический театр',
      price: 1800,
      category: 'Театр',
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800'
    },
    {
      id: 3,
      title: 'Баскетбол: Финал сезона',
      date: '31 октября 2025',
      venue: 'Спортивная арена',
      price: 3200,
      category: 'Спорт',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
    },
    {
      id: 4,
      title: 'Stand-up шоу',
      date: '1 ноября 2025',
      venue: 'Клуб "Смех"',
      price: 1500,
      category: 'Развлечения',
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800'
    },
    {
      id: 5,
      title: 'Выставка современного искусства',
      date: '2 ноября 2025',
      venue: 'Галерея искусств',
      price: 800,
      category: 'Искусство',
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800'
    },
    {
      id: 6,
      title: 'Рок-фестиваль',
      date: '3 ноября 2025',
      venue: 'Открытая площадка',
      price: 4500,
      category: 'Музыка',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'
    }
  ]

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function generateSeats(): Seat[] {
    const seats: Seat[] = []
    for (let row = 1; row <= 10; row++) {
      for (let num = 1; num <= 12; num++) {
        const randomStatus = Math.random() > 0.7 ? 'sold' : 'available'
        seats.push({
          id: `${row}-${num}`,
          row,
          number: num,
          status: randomStatus,
          price: row <= 3 ? 3500 : row <= 7 ? 2500 : 1500
        })
      }
    }
    return seats
  }

  function handleSeatClick(seatId: string) {
    const seat = seats.find(s => s.id === seatId)
    if (!seat || seat.status === 'sold') return

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId))
      setSeats(seats.map(s => s.id === seatId ? { ...s, status: 'available' } : s))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
      setSeats(seats.map(s => s.id === seatId ? { ...s, status: 'selected' } : s))
    }
  }

  function getTotalPrice() {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId)
      return total + (seat?.price || 0)
    }, 0)
  }

  const faqItems = [
    {
      question: 'Как купить билеты?',
      answer: 'Выберите мероприятие, укажите количество билетов и места, затем оформите заказ. Билеты придут на вашу электронную почту.'
    },
    {
      question: 'Можно ли вернуть билеты?',
      answer: 'Да, билеты можно вернуть не позднее чем за 3 дня до мероприятия. Возврат осуществляется в течение 5-7 рабочих дней.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Принимаем оплату картами Visa, MasterCard, МИР, а также через СБП и электронные кошельки.'
    },
    {
      question: 'Как получить билеты?',
      answer: 'Электронные билеты отправляются на email сразу после оплаты. Их можно распечатать или показать с экрана смартфона.'
    },
    {
      question: 'Есть ли скидки?',
      answer: 'Да, действуют скидки для студентов (10%), пенсионеров (15%) и при покупке от 4 билетов (5%).'
    }
  ]

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-heading text-secondary">БилетПро</h1>
            <nav className="flex gap-6">
              <a href="#faq" className="text-foreground hover:text-primary transition-colors">Помощь</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-secondary to-secondary/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl font-bold font-heading mb-6">
              Билеты на лучшие события
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Надёжная платформа для покупки билетов на концерты, спектакли и спортивные мероприятия
            </p>
            <div className="flex gap-3 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск мероприятий..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="pl-10 bg-white"
                />
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold font-heading mb-8 text-center">Популярные мероприятия</h3>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="music">Музыка</TabsTrigger>
              <TabsTrigger value="theater">Театр</TabsTrigger>
              <TabsTrigger value="sport">Спорт</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="font-heading text-xl">{event.title}</CardTitle>
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="MapPin" className="h-4 w-4" />
                      {event.venue}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">от {event.price} ₽</span>
                  <Button 
                    onClick={() => setSelectedEvent(event)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Выбрать места
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-3xl font-bold font-heading mb-8 text-center">Часто задаваемые вопросы</h3>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-heading">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-heading font-bold text-xl mb-4">БилетПро</h4>
              <p className="text-white/80">
                Надёжная платформа для покупки билетов на любые мероприятия
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  <span>8 800 555-35-35</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  <span>info@biletpro.ru</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-4">Следите за нами</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Facebook" className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Instagram" className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Twitter" className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 БилетПро. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>
              Выберите места в зале
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg text-center">
              <div className="inline-flex items-center gap-2 text-sm font-medium">
                <Icon name="Monitor" className="h-5 w-5" />
                СЦЕНА
              </div>
            </div>

            <div className="space-y-2">
              {Array.from({ length: 10 }, (_, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 justify-center items-center">
                  <span className="text-xs text-muted-foreground w-6">Ряд {rowIndex + 1}</span>
                  <div className="flex gap-1">
                    {seats
                      .filter(seat => seat.row === rowIndex + 1)
                      .map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.status === 'sold'}
                          className={`
                            w-8 h-8 rounded text-xs font-medium transition-all
                            ${seat.status === 'available' ? 'bg-green-100 hover:bg-green-200 text-green-800' : ''}
                            ${seat.status === 'selected' ? 'bg-primary text-white scale-110' : ''}
                            ${seat.status === 'sold' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
                          `}
                        >
                          {seat.number}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span>Свободно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span>Выбрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span>Занято</span>
              </div>
            </div>

            {selectedSeats.length > 0 && (
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Выбрано мест: {selectedSeats.length}</span>
                  <span className="text-2xl font-bold text-primary">{getTotalPrice()} ₽</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                  Перейти к оплате
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Index