import { REASONS } from "@/constants/config";
import React, { memo, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../ui/Button";

interface ModalReasonProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  action: "reject" | "pending" | null;
}

const ModalReason: React.FC<ModalReasonProps> = ({
  isOpen,
  onClose,
  onSubmit,
  action,
}) => {
  const [selected, setSelected] = useState("");
  const [comment, setComment] = useState("");
  const [otherReason, setOtherReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const finalReason = selected === "Другое" ? otherReason.trim() : selected;

    if (!finalReason) return;

    onSubmit(finalReason);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-300">
        <div className="text-xl font-bold mb-4 text-center">
          {action === "reject"
            ? "Укажите причину отклонения"
            : "Укажите причину для доработки"}
        </div>

        <div className="flex flex-col gap-3 mb-4">
          {REASONS.map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                name="reason"
                value={reason}
                checked={selected === reason}
                onChange={() => setSelected(reason)}
                className="w-5 h-5"
              />
              <span className="text-lg">{reason}</span>
            </label>
          ))}

          {selected === "Другое" && (
            <input
              type="text"
              placeholder="Введите вашу причину..."
              className="border rounded-lg p-2 text-lg w-full"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          )}

          <textarea
            placeholder="Комментарий"
            className="border rounded-lg p-2 text-lg w-full min-h-20 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-gray-700"
          >
            Отмена
          </button>

          <Button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-red-400 text-white font-semibold disabled:bg-red-300"
            disabled={!selected || (selected === "Другое" && !otherReason)}
            value="Отправить"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
export default memo(ModalReason);
