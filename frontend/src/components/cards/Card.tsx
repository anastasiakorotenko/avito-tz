import type { CardItemProps } from "@/types/interfaces";
import React, { memo } from "react";
import { ROUTES, STATUS_LABELS } from "@/constants/config";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { ICONS } from "@/constants/icons";

const Card: React.FC<CardItemProps> = ({
  id,
  title,
  images,
  price,
  category,
  status,
  createdAt,
  priority,
}) => {
  return (
    <div className="flex border dark:text-gray-200 border-b-orange-950 dark:bg-white/25 dark:border-gray-950 rounded-2xl w-full p-6">
      <div className="flex flex-col w-full min-[600px]:flex-row justify-between gap-4">
        <div className="lg:w-60 min-[600px]:h-50 w-full h-80 my-auto overflow-hidden rounded-lg flex">
          <img
            className="w-full h-full object-cover"
            src={images[0]}
            alt={title}
          />
        </div>

        <div className="flex flex-col lg:gap-2 gap-1 max-w-sm w-full">
          <div className="font-bold lg:text-2xl text-[16px]">{title}</div>

          <div className="flex gap-1 items-center">
            <div
              className={`rounded-full w-3 h-3 ${
                priority === "urgent"
                  ? "bg-fuchsia-800/80 dark:bg-fuchsia-300"
                  : "bg-amber-900 dark:bg-blue-200"
              }`}
            ></div>
            <div
              className={`mb-0.5 ${
                priority === "urgent"
                  ? "text-fuchsia-800/80 dark:text-fuchsia-300"
                  : "text-amber-900 dark:text-blue-200"
              }`}
            >
              {priority === "urgent" ? "срочное" : "обычное"}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <img
              src={ICONS.cash}
              className="w-auto object-cover max-h-5"
              alt="cash"
            />
            <div className="lg:text-lg text-md">{formatPrice(price)} ₽</div>
          </div>
          <div className="lg:text-lg text-md">Категория: {category}</div>
          <div className="lg:text-lg text-md">
            Дата создания: {formatDate(createdAt)}
          </div>
        </div>

        <div className="flex w-full min-[560px]:w-auto flex-row-reverse justify-between min-[560px]:flex-col h-full items-end">
          <div
            className={`text-sm lg:text-[16px] ${
              status === "pending"
                ? "text-amber-400"
                : status === "approved"
                ? "text-green-400"
                : status === "draft"
                ? "text-blue-400"
                : "text-red-400"
            }`}
          >
            {STATUS_LABELS[status]}
          </div>
          <Link to={ROUTES.CARD_DETAILS(String(id))}>
            <Button
              className="font-medium bg-green-200/70 dark:bg-green-500/30"
              value="Открыть"
              imageUrl={ICONS.arrow}
              classNameImage="w-4 h-3"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
