import { useEffect, useState } from "react";

import ValuesInput from "./Components/ExpensesInput";
import ValuesField from "./Components/ValuesField";
import GainValue from "./Components/GainValue";
import formatBRL from "./utils/FormatCurrency";

function App() {
  function startEditExpense(expense) {
    setEditingExpense(expense);
    setExpense({
      value: expense.value,
      description: expense.description,
      category: expense.category,
    });
  }

  function updateExpense() {
    if (!editingExpense) return;

    const difference = expense.value - editingExpense.value;
    if (total.remainingValue - difference < 0) {
      setMessage({
        type: "error",
        text: "Valor inválido!",
      });
      return;
    } else {
      const updatedExpense = {
        ...editingExpense,
        ...expense,
        value: Number(expense.value),
      };

      setExpenseList((prev) =>
        prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e)),
      );
      setTotal((prev) => ({
        ...prev,
        remainingValue: prev.remainingValue - difference,
        spentValue: prev.spentValue + difference,
      }));
      setEditingExpense(null);
      setExpense({ value: "", description: "", category: "" });

      setMessage({
        type: "success",
        text: "Gasto atualizado com sucesso!",
      });
    }
  }

  function removeExpense(id) {
    const expenseToRemove = expenseList.find((e) => e.id === id);
    console.log(expenseToRemove);
    setExpenseList((prev) =>
      prev.filter((prevExpense) => prevExpense.id !== expenseToRemove.id),
    );
    setTotal((prev) => ({
      ...prev,
      remainingValue: prev.remainingValue + expenseToRemove.value,
      spentValue: prev.spentValue - expenseToRemove.value,
    }));

    setMessage({
      type: "success",
      text: "Tarefa removida com sucesso!",
    });
  }

  const initialData = () => {
    const stored = localStorage.getItem("appValues");
    return stored
      ? JSON.parse(stored)
      : {
          expenseList: [],
          total: {
            totalAmount: 0,
            remainingValue: 0,
            spentValue: 0,
          },
        };
  };
  const [editingExpense, setEditingExpense] = useState(null);
  const [total, setTotal] = useState(() => initialData().total);
  const [expenseList, setExpenseList] = useState(
    () => initialData().expenseList,
  );
  const [value, setValue] = useState("");
  const [expense, setExpense] = useState({
    value: "",
    description: "",
    category: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    const data = {
      expenseList,
      total,
    };

    localStorage.setItem("appValues", JSON.stringify(data));
  }, [expenseList, total]);

  function addValue() {
    if (value <= 0) {
      setMessage({
        type: "error",
        text: "O valor adicionado deve ser maior do que zero.",
      });
      setValue("");
      return;
    } else {
      setMessage({
        type: "success",
        text: "Valor adicionado com sucesso!",
      });
    }

    setTotal((prev) => ({
      ...prev,
      totalAmount: prev.totalAmount + Number(value),
      remainingValue: prev.remainingValue + Number(value),
    }));
    setValue("");
  }

  function renderExpense() {
    setMessage({ type: "", text: "" });
    if (!expense.value || !expense.description || !expense.category) {
      setMessage({
        type: "error",
        text: "Preencha todos os campos antes de salvar!",
      });
      return;
    }

    if (expense.value > total.remainingValue) {
      setMessage({ type: "error", text: "Saldo insuficiente" });
      return;
    }

    if (expense.value <= 0) {
      setMessage({
        type: "error",
        text: "O valor do gasto precisa ser maior que 0",
      });
      return;
    }
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
      value: Number(expense.value),
      date: new Date().toLocaleDateString("pt-BR"),
    };

    setTotal((prev) => ({
      ...prev,
      remainingValue: prev.remainingValue - Number(expense.value),
      spentValue: prev.spentValue + Number(expense.value),
    }));
    setExpenseList((prev) => [newExpense, ...prev]);
    setMessage({ type: "success", text: "Gasto adicionado com êxito!" });
    setExpense((prev) => ({
      ...prev,
      value: "",
      description: "",
      category: "",
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
              {message.type == "error" && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {message.text}
                </p>
              )}
              {message.type == "success" && (
                <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                  {message.text}
                </p>
              )}
              <ValuesInput setExpense={setExpense} expenseValues={expense} />
              <button
                onClick={editingExpense ? updateExpense : renderExpense}
                className={`w-full py-2 rounded-md text-white transition
    ${
      editingExpense
        ? "bg-yellow-400 hover:bg-yellow-300 text-zinc-900"
        : "bg-emerald-600 hover:bg-emerald-500"
    }
  `}
              >
                {editingExpense ? "Atualizar gasto" : "Salvar gasto"}
              </button>
            </div>
          </div>

          {/* COLUNA DIREITA – TABELA */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="text-center bg-zinc-800 text-white px-4 py-3">
              {!total.totalAmount ? (
                <p className="text-lg font-semibold m1-2">
                  Nenhum valor adicionado.
                </p>
              ) : (
                <>
                  <p className="text-lg">
                    Total adicionado:
                    <span className="text-lg font-semibold ml-2">
                      {formatBRL(total.totalAmount)}
                    </span>
                  </p>
                  <p>
                    Valor restante:{" "}
                    <span>{formatBRL(total.remainingValue)}</span>
                  </p>
                  <p>
                    Valor gasto: <span>{formatBRL(total.spentValue)}</span>
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
            <ul className="md:space-0 space-y-3 max-h-118 overflow-y-auto pr-2">
              {expenseList.length ? (
                expenseList.map((expense) => (
                  <ValuesField
                    onRemove={removeExpense}
                    onEdit={startEditExpense}
                    key={expense.id}
                    expense={expense}
                  />
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
