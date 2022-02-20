import Link from "next/link"
import { useRouter } from "next/router"
import cl from "clsx"

function IconLink({ Icon, text, link, styles }: any) {
  const { pathname } = useRouter()
  return (
    <Link href={link}>
      <a className="group flex cursor-pointer flex-col items-center rounded-lg p-2 transition-colors hover:bg-[#44202e]">
        <Icon
          className={cl(
            "h-8 w-8",
            pathname === link ? "text-[#f34b5a]" : "group-hover:text-[#f34b5a]"
          )}
        />
        <h3
          className={cl(
            pathname === link ? "text-[#f34b5a]" : "group-hover:text-[#f34b5a]",
            "hidden text-center md:inline-flex"
          )}
        >
          {text}
        </h3>
      </a>
    </Link>
  )
}

export default IconLink
