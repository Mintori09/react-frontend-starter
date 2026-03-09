import { Home, PanelLeft, Users, User2, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useNavigation, useLocation } from 'react-router';

import logo from '@/assets/react.svg';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paths } from '@/config/paths';
import { ROLES, useAuthorization, useLogout } from '@/features/auth';
import { cn } from '@/lib/utils';

import { Link } from '../ui/link';

type SideNavigationItem = {
    name: string;
    to: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
};

const Logo = () => {
    return (
        <Link
            className="flex items-center text-white"
            to={paths.home.getHref()}
        >
            <img className="h-8 w-auto" src={logo} alt="Workflow" />
            <span className="text-sm font-semibold text-white ml-2">
                Bulletproof React
            </span>
        </Link>
    );
};

const Progress = () => {
    const { state } = useNavigation();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (state !== 'loading') {
            return;
        }

        const timer = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
        }, 300);

        return () => {
            clearInterval(timer);
            setProgress(0);
        };
    }, [state]);

    if (state !== 'loading') {
        return null;
    }

    return (
        <div
            className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out z-[9999]"
            style={{ width: `${progress}%` }}
        ></div>
    );
};

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="size-8" aria-hidden="true" />;
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout({
        onSuccess: () => navigate(paths.auth.login.getHref(location.pathname)),
    });
    const { checkAccess } = useAuthorization();
    const navigation = [
        { name: 'Dashboard', to: paths.app.dashboard.getHref(), icon: Home },
        checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
            name: 'Users',
            to: paths.app.users.getHref(),
            icon: Users,
        },
    ].filter(Boolean) as SideNavigationItem[];

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 py-4">
                    <div className="flex h-16 shrink-0 items-center px-4">
                        <Logo />
                    </div>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            end={item.to === paths.app.dashboard.getHref()}
                            className={({ isActive }) =>
                                cn(
                                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                                    isActive && 'bg-gray-900 text-white',
                                )
                            }
                        >
                            <item.icon
                                className={cn(
                                    'text-gray-400 group-hover:text-gray-300',
                                    'mr-4 size-6 shrink-0',
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
                    <Progress />
                    <Drawer direction="left">
                        <DrawerTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="size-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-black pt-10 text-white sm:max-w-60 h-full w-[240px]">
                            <nav className="grid gap-6 text-lg font-medium">
                                <div className="flex h-16 shrink-0 items-center px-4">
                                    <Logo />
                                </div>
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.to}
                                        end={
                                            item.to ===
                                            paths.app.dashboard.getHref()
                                        }
                                        className={({ isActive }) =>
                                            cn(
                                                'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                                                isActive &&
                                                    'bg-gray-900 text-white',
                                            )
                                        }
                                    >
                                        <item.icon
                                            className={cn(
                                                'text-gray-400 group-hover:text-gray-300',
                                                'mr-4 size-6 shrink-0',
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </DrawerContent>
                    </Drawer>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <span className="sr-only">Open user menu</span>
                                <User2 className="size-6 rounded-full" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate(paths.app.profile.getHref())
                                }
                                className={cn(
                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                                )}
                            >
                                Your Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className={cn(
                                    'block px-4 py-2 text-sm text-gray-700 w-full cursor-pointer',
                                )}
                                onClick={() => logout.mutate({})}
                            >
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
