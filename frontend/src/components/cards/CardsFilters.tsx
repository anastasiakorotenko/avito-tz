import { CATEGORIES, STATUS_LABELS, STATUSES } from "@/constants/config";
import type { CardFiltersProps } from "@/types/interfaces";
import Button from "../ui/Button";
import { ICONS } from "@/constants/icons";

export const CardsFilters = ({
  status,
  categoryId,
  setCategory,
  searchPrice,
  setSearchPrice,
  resetFilters,
  search,
  setSearch,
  handleCheckboxChange,
}: CardFiltersProps) => {
  return (
    <div className="w-full p-5 rounded-2xl dark:bg-gray-500 dark:border-gray-950 bg-amber-100/30 border border-amber-950 flex flex-col gap-3">
      <div className="flex gap-3">
        <img src={ICONS.filter} className="w-6" alt="filter" />
        <div className="sm:text-2xl text-lg font-bold mb-0.5">Фильтры</div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-md font-medium">Статус</p>

        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition"
            >
              <input
                type="checkbox"
                checked={status.includes(s)}
                value={s}
                onChange={handleCheckboxChange}
                className="accent-amber-950/60 dark:accent-gray-950 w-4 h-4 cursor-pointer"
              />
              <span className="text-sm">{STATUS_LABELS[s]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex w-full justify-between lg:flex-row flex-col">
        <div className="flex flex-col gap-2">
          <label className="text-md font-medium">Категория</label>
          <select
            value={categoryId ?? ""}
            onChange={(e) =>
              setCategory(e.target.value === "" ? null : Number(e.target.value))
            }
            className="bg-amber-100/30 max-w-[215px] px-4 py-2 border border-gray-200 dark:bg-gray-400 rounded-xl focus:ring-1 focus:ring-amber-950 outline-none transition"
          >
            <option value="">Все категории</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-md font-medium">Цена</p>

          <div className="flex sm:flex-row flex-col gap-2">
            <input
              type="number"
              placeholder="от"
              value={searchPrice[0]}
              onChange={(e) => setSearchPrice([e.target.value, searchPrice[1]])}
              className="w-fit px-4 py-2 bg-amber-100/30 dark:bg-gray-400 border border-gray-200 rounded-xl focus:ring-1 outline-none transition"
            />

            <input
              type="number"
              placeholder="до"
              value={searchPrice[1]}
              onChange={(e) => setSearchPrice([searchPrice[0], e.target.value])}
              className="w-fit px-4 py-2 bg-amber-100/30 dark:bg-gray-400 border border-gray-200 rounded-xl focus:ring-1 outline-none transition"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-medium">Поиск</label>
          <input
            id="searchInput"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Введите название..."
            className="w-fit px-4 py-2 bg-amber-100/30 dark:bg-gray-400 border border-gray-200 rounded-xl focus:ring-1 focus:ring-amber-950 outline-none transition"
          />
        </div>
      </div>

      <Button
        value="Сбросить"
        className="dark:bg-gray-900/80 bg-amber-950/30 max-w-28 items-center justify-center"
        onClick={resetFilters}
      />
    </div>
  );
};
