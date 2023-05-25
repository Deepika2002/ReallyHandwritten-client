
import Sidebarheader from "../components/sidebarheader"

const products = [
  {
    id: 1,
    name: 'Affordable Classy Thank You Cards',
    href: '#',
    price: '$4.47',
    description: '3 sizes available',
    imageSrc: '/assets/cardImgs/affordable/first.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 2,
    name: 'Premium Gold Foil Pressed',
    href: '#',
    price: '$5.60',
    description: 'Walnut',
    imageSrc: '/assets/cardImgs/premium/first.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  }
  // More products...
]



export default function Cards() {
  return (
    <div>
      <Sidebarheader />
    
    <div className="flex-col lg:pl-64 bg-white">
      <div className="flex-1 mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Cards</h2>
          
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                <img src={product.imageSrc} alt={product.imageAlt} className="object-cover object-center" />
                
              </div>
              <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                <h3>
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p>{product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}