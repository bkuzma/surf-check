export default function Header() {
  const router = useRouter()

  return (
    <header className="p-5 bg-green-500 dark:bg-green-900">
      <h1 className="text-xl text-center font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider">
        🚜 Jæren Surf Check 🏄
      </h1>
      <p className="mt-2 text-sm text-center text-gray-900 dark:text-yellow-300">
        Bore Beach surf forecast with swell data from Magic Seaweed and wind
        data from YR.
      </p>
    </header>
  )
}
