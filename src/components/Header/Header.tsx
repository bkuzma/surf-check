import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

import GithubLogo from "../../assets/svg/github-logo.svg"

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
    <header className="bg-green-500 dark:bg-green-900 text-gray-900 dark:text-yellow-300">
      <div className="container mx-auto p-5">
        <div className="flex justify-between md:justify-start md:space-x-12 items-center">
          <h1 className="italic text-xl text-center font-medium uppercase tracking-wider">
            Surf Check
          </h1>
          <nav>
            <ul className="flex items-center space-x-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a
                      className={classNames(
                        {
                          "bg-green-600 dark:bg-green-800":
                            link.href === `/${router.pathname.split("/")[1]}`,
                        },
                        "block uppercase text-xs tracking-wider font-medium p-2 hover:bg-green-600 dark:hover:bg-green-700 rounded"
                      )}
                    >
                      {link.text}
                    </a>
                  </Link>
                </li>
              ))}
              <li className="">
                <a
                  className="rounded p-2 block"
                  href="https://github.com/bkuzma/surf-check"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubLogo height="20" width="20" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-4 text-xs">
          Bore Beach surf forecast with swell data from Magic Seaweed and wind
          data from YR.
        </p>
      </div>
    </header>
  )
}
