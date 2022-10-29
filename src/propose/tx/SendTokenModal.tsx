import * as React from 'react'
import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import { dialogOverlay, dialog, dialogContent } from '@design/dialog.css'

type ModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={setIsOpen} as="div" className={dialog}>
      <div className={dialogContent}>
        <Dialog.Overlay className={dialogOverlay} />

        <Dialog.Title className="text-red-500 text-3xl">Deactivate account</Dialog.Title>
        <Dialog.Description className="text-xl m-2">This will permanently deactivate your account</Dialog.Description>

        <p className="text-md m-4">
          Are you sure you want to deactivate your account? All of your data will be permanently removed. This action
          cannot be undone.
        </p>

        <button
          className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setIsOpen(false)}
        >
          Deactivate
        </button>
        <button
          className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  )
}
