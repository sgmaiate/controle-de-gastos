export default function ValuesInput(props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700">Gasto</label>
        <input
          type="number"
          value={props.spent}
          onChange={(event) =>
            props.setExpense((prev) => ({
              ...prev,
              value: event.target.value,
            }))
          }
          className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-zinc-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700">Descrição</label>
        <textarea
          maxLength="50"
          value={props.description}
          onChange={(event) =>
            props.setExpense((prev) => ({
              ...prev,
              description: event.target.value,
            }))
          }
          className="border border-zinc-400 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-700">Categoria</label>
        <select
          onChange={(event) =>
            props.setExpense((prev) => ({
              ...prev,
              category: event.target.value,
            }))
          }
          className="border border-zinc-400 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
          defaultValue=""
        >
          <option disabled value="">
            Selecione uma opção
          </option>
          <option>Casa</option>
          <option>Contas</option>
          <option>Comida</option>
          <option>Outros</option>
        </select>
      </div>
    </div>
  );
}
