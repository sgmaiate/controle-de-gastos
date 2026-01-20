import formatBRL from "../../utils/FormatCurrency";

export default function ValuesField(props) {
  return (
    <li className="text-center grid grid-cols-[1fr_2fr_1fr_2fr] px-4 py-3 border-b last:border-b-0 text-sm items-center">
      <span className="font-medium text-zinc-800">
        {formatBRL(props.expense.value)}
      </span>
      <span className="text-zinc-600 truncate">
        {props.expense.description}
      </span>
      <span className="text-md text-zinc-500">{props.expense.category}</span>
      <span>{props.expense.date}</span>
    </li>
  );
}
