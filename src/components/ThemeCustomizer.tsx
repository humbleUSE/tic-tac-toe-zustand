import { useEffect } from "react";
import { useThemeStore, type ThemeMode, type ThemeAccent } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Sun, Moon, Laptop, Check } from "lucide-react";

const accents: { label: string; value: ThemeAccent; color: string }[] = [
  { label: "Default", value: "default", color: "bg-foreground" },
  { label: "Violet", value: "violet", color: "bg-violet-500" },
  { label: "Emerald", value: "emerald", color: "bg-emerald-500" },
  { label: "Amber", value: "amber", color: "bg-amber-500" },
  { label: "Rose", value: "rose", color: "bg-rose-500" },
];

const modes: { label: string; value: ThemeMode; icon: typeof Sun }[] = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Laptop },
];

export default function ThemeCustomizer() {
  const { mode, accent, setMode, setAccent } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    // Handle dark / light / system mode
    const isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.toggle("dark", isDark);

    // Handle accent classes
    root.classList.remove(
      "theme-violet",
      "theme-emerald",
      "theme-amber",
      "theme-rose"
    );
    if (accent !== "default") {
      root.classList.add(`theme-${accent}`);
    }
  }, [mode, accent]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="gap-2 cursor-pointer shadow-xs transition-all hover:bg-muted"
          >
            <Palette className="size-4 text-primary" />
            <span>Theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Appearance
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.value;
            return (
              <DropdownMenuItem
                key={m.value}
                onClick={() => setMode(m.value)}
                className="flex items-center justify-between cursor-pointer text-xs"
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-3.5 text-muted-foreground" />
                  <span>{m.label}</span>
                </span>
                {isSelected && <Check className="size-3.5 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Accent Color
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {accents.map((a) => {
            const isSelected = accent === a.value;
            return (
              <DropdownMenuItem
                key={a.value}
                onClick={() => setAccent(a.value)}
                className="flex items-center justify-between cursor-pointer text-xs"
              >
                <span className="flex items-center gap-2">
                  <span className={`size-3 rounded-full ${a.color}`} />
                  <span>{a.label}</span>
                </span>
                {isSelected && <Check className="size-3.5 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
