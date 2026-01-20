import { use, useEffect, useRef, useState } from "react";

import ValuesInput from "./Components/ExpensesInput";
import ValuesField from "./Components/ValuesField";
import GainValue from "./Components/GainValue";
import formatBRL from "./utils/FormatCurrency";

function App() {
  const initialData = () => {
    const stored = localStorage.getItem("appValues");
    return stored
      ? JSON.parse(stored)
      : {
          expenseList: [],
          total: 0,
          remaining: 0,
          spent: 0,
        };
  };
  const [total, setTotal] = useState(() => initialData().total);
  const [remaining, setRemaining] = useState(() => initialData().remaining);
  const [spent, setSpent] = useState(() => initialData().spent);
  const [expenseList, setExpenseList] = useState(
    () => initialData().expenseList,
  );
  const [value, setValue] = useState("");
  const [expense, setExpense] = useState({
    value: "",
    description: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const data = {
      expenseList,
      total,
      remaining,
      spent,
    };

    localStorage.setItem("appValues", JSON.stringify(data));
  }, [expenseList, total, remaining, spent]);

  const itemKey = useRef(1);

  function addValue() {
    if (value <= 0) {
      setError("O valor adicionado deve ser maior do que zero.");
      setValue("");
      return;
    }
    setRemaining(remaining + +value);
    setTotal((prev) => prev + Number(value));
    setValue("");
  }

  function renderExpense() {
    setSuccess("");
    if (!expense.value || !expense.description || !expense.category) {
      setError("Preencha todos os campos antes de salvar!");
      return;
    }

    if (expense.value > total || expense.value > remaining) {
      setError("Saldo insuficiente");
      return;
    }

    if (expense.value <= 0) {
      setError("O valor do gasto precisa ser maior que 0");
      return;
    }
    const newExpense = {
      ...expense,
      value: Number(expense.value),
      date: new Date().toLocaleDateString("pt-BR"),
    };

    setSpent(() => spent + +expense.value);
    setRemaining(+remaining - +expense.value);
    setExpenseList((prev) => [newExpense, ...prev]);
    setSuccess("Gasto adicionado com êxito!");
    setError("");
    setExpense((prev) => ({
      ...prev,
      value: "",
      description: "",
    }));
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-zinc-800">
          Controle de gastos
        </h1>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUNA ESQUERDA – INPUTS */}
          <div className="space-y-6">
            {/* Ganho */}
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
              <GainValue setValue={setValue} gainValue={value} />
              <button
                onClick={addValue}
                className="w-full bg-zinc-800 text-white py-2 rounded-md hover:bg-zinc-700 transition"
              >
                Adicionar dinheiro
              </button>
            </div>

            {/* Gasto */}
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                  {success}
                </p>
              )}
              <ValuesInput
                setExpense={setExpense}
                description={expense.description}
                spent={expense.value}
              />
              <button
                onClick={renderExpense}
                className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-500 transition"
              >
                Salvar gasto
              </button>
            </div>
          </div>

          {/* COLUNA DIREITA – TABELA */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="text-center bg-zinc-800 text-white px-4 py-3">
              {!total ? (
                <p className="text-lg font-semibold m1-2">
                  Nenhum valor adicionado.
                </p>
              ) : (
                <>
                  <p className="text-lg">
                    Total adicionado:
                    <span className="text-lg font-semibold ml-2">
                      {formatBRL(total)}
                    </span>
                  </p>
                  <p>
                    Valor restante: <span>{formatBRL(remaining)}</span>
                  </p>
                  <p>
                    Valor descontado: <span>{formatBRL(spent)}</span>
                  </p>
                </>
              )}
            </div>

            {/* Cabeçalho */}

            <div className="text-center grid grid-cols-[1fr_2fr_1fr_2fr] px-4 py-2 text-sm font-medium text-zinc-500 border-b">
              <span>Gasto</span>
              <span>Descrição</span>
              <span>Categoria</span>
              <span>Data</span>
            </div>

            {/* Lista */}
            <ul className="space-y-3 max-h-118 overflow-y-auto pr-2">
              {expenseList.length ? (
                expenseList.map((expense) => (
                  <ValuesField key={itemKey.current++} expense={expense} />
                ))
              ) : (
                <p className="px-4 py-6 text-sm text-zinc-500">
                  Nenhum gasto registrado ainda.
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
