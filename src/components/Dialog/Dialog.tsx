import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { Fragment, ReactNode } from "react"

interface DialogProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Dialog(props: DialogProps) {
  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={props.onClose}
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full p-6 sm:max-w-lg">
              {props.children}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  )
}

Dialog.Description = HeadlessDialog.Description
Dialog.Title = HeadlessDialog.Title
