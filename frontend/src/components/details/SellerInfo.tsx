import { ICONS } from "@/constants/icons";
import type { CardItemProps } from "@/types/interfaces";
import { getRegistrationDuration } from "@/utils/getRegistrationDuration";
import React, { memo } from "react";

interface SellerInfoProps {
  items: CardItemProps;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="sm:text-xl flex gap-3">
          <div className="font-bold">Продавец:</div>
          <div>{items.seller?.name}</div>
        </div>
        <div>|</div>
        <div className="flex gap-2 items-center">
          <img src={ICONS.rating} className="w-auto max-h-5" alt="star" />
          <div className="sm:text-xl">{items.seller?.rating}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="sm:text-xl">{items.seller?.totalAds} объявлений</div>
        <div>|</div>
        <div className="sm:text-xl">
          На сайте: {getRegistrationDuration(items.seller?.registeredAt)}
        </div>
      </div>
    </div>
  );
};

export default memo(SellerInfo);
