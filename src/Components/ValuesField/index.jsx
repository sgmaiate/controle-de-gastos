import { Pencil, Trash2 } from "lucide-react";
import formatBRL from "../../utils/FormatCurrency";

export default function ValuesField({ expense, onRemove, onEdit }) {
  return (
    <>
      {/* MOBILE */}
      <li className="md:hidden bg-white rounded-lg shadow-sm p-4 space-y-3 border border-zinc-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-zinc-800">
            {expense.category}
          </span>
          <span className="text-sm text-zinc-500">{expense.date}</span>
        </div>

        <p className="text-zinc-600">{expense.description}</p>

        <p className="text-lg font-semibold text-emerald-600">
          {formatBRL(expense.value)}
        </p>

        <div className="flex justify-end gap-4 pt-2">
          <button
            onClick={() => onEdit(expense)}
            className="p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 transition"
            title="Editar gasto"
            aria-label="Editar gasto"
          >
            <Pencil className="w-5 h-5 text-yellow-600" />
          </button>

          <button
            onClick={() => onRemove(expense.id)}
            className="p-3 rounded-full bg-red-100 hover:bg-red-200 transition"
            title="Excluir gasto"
            aria-label="Excluir gasto"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </li>

      {/* DESKTOP */}
      <li className="hidden md:grid grid-cols-[1fr_2fr_1fr_2fr] items-center px-4 py-3 border-b last:border-b-0 text-sm">
        <span className="text-center font-medium">
          {formatBRL(expense.value)}
        </span>

        <span className="truncate text-center">{expense.description}</span>

        <span className="text-center">{expense.category}</span>

        <div className="flex justify-end items-center gap-4">
          <span className="text-zinc-500">{expense.date}</span>

          <button
            onClick={() => onEdit(expense)}
            className="p-2 rounded-md hover:bg-yellow-100 transition"
            title="Editar gasto"
            aria-label="Editar gasto"
          >
            <Pencil className="w-4 h-4 text-yellow-600" />
          </button>

          <button
            onClick={() => onRemove(expense.id)}
            className="p-2 rounded-md hover:bg-red-100 transition"
            title="Excluir gasto"
            aria-label="Excluir gasto"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </li>
    </>
  );
}
