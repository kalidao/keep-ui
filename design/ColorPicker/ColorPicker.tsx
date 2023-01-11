import { HexColorPicker } from 'react-colorful'

export const ColorPicker = ({ color, setColor }: { color: string; setColor: (color: string) => void }) => {
  return <HexColorPicker color={color} onChange={setColor} />
}
