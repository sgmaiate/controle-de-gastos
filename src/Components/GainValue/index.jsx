export default function GainValue(props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-zinc-600">Ganho do mês</label>
      <input
        value={props.gainValue}
        onChange={(event) => props.setValue(event.target.value)}
        type="number"
        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
      />
    </div>
  );
}
