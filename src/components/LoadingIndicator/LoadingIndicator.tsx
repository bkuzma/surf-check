import Loader from "../../assets/svg/loader.svg"

export default function LoadingIndicator() {
  return (
    <div className="text-green-600 dark:text-gray-300">
      <Loader height="30" width="30" />
    </div>
  )
}
