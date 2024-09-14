type Props = {
    text: string
    calorias: number
}

export default function CaloriaDisplay({ text, calorias} : Props) {
  return (
    <p className="text-white font-bold grid grid-cols-1 gap-3  text-center">
      <span className="font-black text-6xl">{calorias}</span>
      { text }
    </p>
  );
}
