import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  LogoutIcon,
} from "@heroicons/react/outline"
import { signOut } from "next-auth/react"
import IconLink from "../dashboard/IconLink"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-drac_bg pr-8 font-Roboto text-drac_foreground">
      <aside className="sticky top-0 flex h-screen min-w-[12vw] flex-col items-center justify-between py-8">
        <h1 className="text-2xl">Dashboard</h1>
        <div className="space-y-4">
          <IconLink Icon={HomeIcon} text="Home" link="/admin/dashboard" />
          <IconLink
            Icon={UserIcon}
            text="Ranking Players"
            link="/admin/rankings_players"
          />
          <IconLink
            Icon={UserGroupIcon}
            text="Ranking Times"
            link="/admin/rankings_teams"
          />
        </div>
        <LogoutIcon onClick={() => signOut()} />
      </aside>
      {children}
    </div>
  )
}

export default DashboardLayout
