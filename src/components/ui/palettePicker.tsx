import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePalette } from "@/contexts/PaletteContext";
import { Palette } from "lucide-react";

const PalettePicker = () => {
  const { palette, setPalette } = usePalette();

  const palettes = [
    { id: 'default', name: 'Ocean Blue', color: 'bg-blue-500' },
    { id: 'theme-sunset', name: 'Sunset Orange', color: 'bg-orange-500' },
    { id: 'theme-forest', name: 'Forest Green', color: 'bg-green-600' },
    { id: 'theme-royal', name: 'Royal Purple', color: 'bg-purple-600' },
    { id: 'theme-rose', name: 'Rose Gold', color: 'bg-pink-500' },
  ];

  const currentPalette = palettes.find(p => p.id === palette) || palettes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select Color Palette</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {palettes.map((paletteOption) => (
          <DropdownMenuItem
            key={paletteOption.id}
            onClick={() => setPalette(paletteOption.id as any)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className={`w-4 h-4 rounded-full ${paletteOption.color}`} />
            <span>{paletteOption.name}</span>
            {palette === paletteOption.id && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PalettePicker;
