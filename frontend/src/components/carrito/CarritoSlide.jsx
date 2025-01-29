import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CarritoSlide({ open, setOpen, carrito, setCarrito }) {
  const eliminarProducto = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item._id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    
    setCarrito(prevCarrito => 
      prevCarrito.map(item =>
        item._id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-zinc-900 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-2xl font-bold text-white">Carrito de compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {carrito.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-gray-400">Tu carrito está vacío</p>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-700">
                              {carrito.map((item) => (
                                <li key={item._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                    <img
                                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.imagen}`}
                                      alt={item.nombre}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-white">
                                        <h3>{item.nombre}</h3>
                                        <p className="ml-4">${item.precio * item.cantidad}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => actualizarCantidad(item._id, item.cantidad - 1)}
                                          className="bg-zinc-800 text-white w-6 h-6 rounded hover:bg-zinc-700"
                                        >
                                          -
                                        </button>
                                        <span className="text-gray-400">Cantidad {item.cantidad}</span>
                                        <button
                                          onClick={() => actualizarCantidad(item._id, item.cantidad + 1)}
                                          className="bg-zinc-800 text-white w-6 h-6 rounded hover:bg-zinc-700"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => eliminarProducto(item._id)}
                                        className="font-medium text-blue-500 hover:text-blue-400"
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {carrito.length > 0 && (
                      <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-white">
                          <p>Subtotal</p>
                          <p>${totalCarrito}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400">Envío calculado al finalizar la compra.</p>
                        <div className="mt-6">
                          <button
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                            onClick={() => setOpen(false)}
                          >
                            Proceder al pago
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
                          <button
                            type="button"
                            className="font-medium text-blue-500 hover:text-blue-400"
                            onClick={() => setOpen(false)}
                          >
                            Continuar comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
