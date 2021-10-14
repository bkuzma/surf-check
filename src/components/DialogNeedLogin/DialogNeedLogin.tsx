import Dialog from "../Dialog/Dialog"

interface DialogAddSurfCheckProps {
  isOpen: boolean
  onClose: () => void
}

export default function DialogAddSurfCheck(props: DialogAddSurfCheckProps) {
  return (
    <Dialog isOpen={props.isOpen} onClose={props.onClose}>
      <Dialog.Title
        as="h3"
        className="text-lg leading-6 font-medium text-gray-900"
      >
        Login Required
      </Dialog.Title>
      <p className="mt-6">To add surf checks, you need to be logged in.</p>
      <div className="mt-6 sm:flex sm:flex-row-reverse">
        {/* eslint-disable @next/next/no-html-link-for-pages */}
        <a
          href="/api/auth/login"
          className="btn-green w-full sm:ml-3 sm:w-auto"
        >
          Log in
        </a>
        {/* eslint-enable @next/next/no-html-link-for-pages */}
        <button
          type="button"
          className="btn-outline mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
          onClick={props.onClose}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  )
}
