import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

const LINKS = [
  {
    href: "/",
    text: "Forecast",
  },
  {
    href: "/spots",
    text: "Spots",
  },
]

export default function Header() {
  const router = useRouter()

  return (
    <header className="p-5 bg-green-500 dark:bg-green-900">
      <div className="flex justify-between md:justify-start md:space-x-12 items-center">
        <h1 className="text-md md:text-xl text-center font-medium text-gray-900 dark:text-yellow-300 uppercase tracking-wider">
          🚜 Surf Check 🏄
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a
                    className={classNames({
                      underline: link.href === router.pathname,
                    })}
                  >
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mt-2 text-xs text-gray-900 dark:text-yellow-300">
        Bore Beach surf forecast with swell data from Magic Seaweed and wind
        data from YR.
      </p>
    </header>
  )
}
