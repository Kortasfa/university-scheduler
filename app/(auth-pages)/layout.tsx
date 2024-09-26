import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            <ThemeSwitcher />
          </div>
        </nav>
        <div className="flex flex-col gap-20 max-w-5xl p-5">
          {children}
        </div>
      </div>
    </main>
  );
}
