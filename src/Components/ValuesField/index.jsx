import formatBRL from "../../utils/FormatCurrency";

export default function ValuesField({ expense, onRemove, onEdit }) {
  return (
    <li className="grid grid-cols-[1fr_2fr_1fr_2fr] items-center px-4 py-3 border-b last:border-b-0 text-sm">
      <span className="font-medium text-zinc-800 text-center">
        {formatBRL(expense.value)}
      </span>

      <span className="text-zinc-600 truncate text-center">
        {expense.description}
      </span>

      <span className="text-zinc-500 text-center">{expense.category}</span>

      {/* DATA + AÇÕES */}
      <div className="flex items-center justify-end gap-2">
        <span className="text-zinc-500 mr-3">{expense.date}</span>

        <button
          onClick={() => onEdit(expense)}
          className="px-2 py-1 text-xs rounded-md bg-yellow-400 hover:bg-yellow-300 transition"
        >
          Editar
        </button>

        <button
          onClick={() => onRemove(expense.id)}
          className="px-2 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-400 transition"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
