import { STATUS_ICONS, STATUS_LABELS } from "@/constants/config";
import { formatDate } from "@/utils/formatDate";
import { ICONS } from "@/constants/icons";
import type React from "react";
import type { CardItemProps } from "@/types/interfaces";

interface ModerationHistoryProps {
  items: CardItemProps;
}

export const ModerationHistory: React.FC<ModerationHistoryProps> = ({
  items,
}) => {
  return (
    <div className="sm:w-1/2 h-auto flex flex-col gap-2 md:p-5 p-4 rounded-2xl bg-amber-100/30 dark:bg-amber-100/40 border dark:border-gray-950 border-amber-950">
      <div className="flex items-center gap-2">
        <img src={ICONS.history} className="w-auto max-h-5" alt="history" />
        <div className="sm:text-2xl text-lg font-bold leading-5">
          История модерации
        </div>
      </div>

      <div className="flex w-full gap-3 flex-col">
        {items.moderationHistory.length ? (
          items.moderationHistory.map((m) => (
            <div className="flex flex-col gap-1" key={m.id}>
              <div className="sm:text-xl text-sm font-medium">
                Модератор: {m.moderatorName}
              </div>
              <div className="sm:text-xl text-sm">
                {formatDate(m.timestamp)}
              </div>
              <div className="flex flex-row items-center gap-2">
                <img
                  className="max-w-5 h-5 object-center"
                  src={STATUS_ICONS[m.action]}
                  alt={m.action}
                />
                <div className="sm:text-xl text-sm mb-0.5">
                  {STATUS_LABELS[m.action]}
                </div>
              </div>

              {!!m.reason && (
                <div className="sm:text-xl text-sm">{`Причина: ${m.reason}`}</div>
              )}

              {!!m.comment && (
                <div className="sm:text-xl text-sm">{`Комментарий: ${m.comment}`}</div>
              )}
            </div>
          ))
        ) : (
          <div className="sm:text-xl text-sm">
            Объявление не проходило модерацию
          </div>
        )}
      </div>
    </div>
  );
};
