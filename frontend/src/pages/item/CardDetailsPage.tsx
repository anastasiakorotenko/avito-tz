import {
  fetchItemDetails,
  postApprovedAds,
  postPendingAds,
  postRejectedAds,
} from "@/api/api";
import {
  SliderImages,
  ModerationHistory,
  CharacteristicsTable,
  ModalReason,
  SellerInfo,
} from "@/components/details";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants/config";
import { ICONS } from "@/constants/icons";
import type { CardItemProps } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdsStore } from "@/store/useAdsStore";
import { useTheme } from "@/theme/useTheme";
import { useModerationHotkeys } from "@/hooks/useModerHotkeys";
import { motion } from "framer-motion";

export const CardDetailsPage = () => {
  useEffect(() => {
    document.title = "Детали объявления";
  }, []);
  const { theme, toggleTheme } = useTheme();
  const { id } = useParams<{ id: string }>();

  const [items, setItems] = useState<CardItemProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState<"reject" | "pending" | null>(null);

  const filteredAds = useAdsStore((state) => state.filteredAds);

  const navigate = useNavigate();

  const approve = () => {
    if (items) postApprovedAds(items.id);
  };

  const reject = () => {
    setReason("reject");
    setIsModalOpen(true);
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      navigate(ROUTES.CARD_DETAILS(String(filteredAds[currentIndex - 1].id)));
    }
  };

  const goNext = () => {
    if (currentIndex < filteredAds.length - 1) {
      navigate(ROUTES.CARD_DETAILS(String(filteredAds[currentIndex + 1].id)));
    }
  };

  useModerationHotkeys({
    approve,
    reject,
    goNext,
    goPrev,
  });

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItemDetails(id);
        setItems(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ошибка получения данных")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="loader"></div>;
  if (error) {
    return (
      <img
        className="w-20 h-auto mx-auto"
        src="https://i.pinimg.com/1200x/14/7d/df/147ddf3ea70dc257d8e68462106625b9.jpg"
        alt="sad dog"
      />
    );
  }
  if (!items) return <p>Нет данных для отображения</p>;

  const currentIndex = filteredAds.findIndex((ad) => ad.id === items.id);

  const handleModalSubmit = async (finalReason: string, comment?: string) => {
    if (!reason) return;

    if (reason === "reject") {
      await postRejectedAds(items.id, finalReason, comment);
    }
    if (reason === "pending") {
      await postPendingAds(items.id, finalReason, comment);
    }

    setIsModalOpen(false);
    setReason(null);
    console.log("reason:", finalReason, "comment:", comment);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full dark:bg-gray-950/90 bg-white"
    >
      <div className="w-full h-full dark:bg-gray-950/90 bg-white">
        <div className="flex flex-col max-w-5/6 mx-auto px-auto py-3 items-center md:gap-10 gap-5">
          <div className="flex w-full justify-end">
            <Button
              onClick={toggleTheme}
              className="bg-white dark:bg-black dark:text-white text-black text-sm px-3 py-1 rounded border border-gray-500 hover:bg-gray-300 hover:text-white hover:dark:text-black dark:hover:bg-gray-300 transition w-20"
              value={theme === "dark" ? "🌕 light" : "🌑 dark"}
            />
          </div>

          <div className="md:text-3xl dark:text-gray-100/80 text-xl font-bold mb-2 md:mb-5">
            {items.title}
          </div>

          <div className="flex gap-3 flex-col w-full">
            <div className="flex w-full h-auto sm:flex-row flex-col gap-3 md:gap-5">
              <SliderImages images={items.images} />
              <ModerationHistory items={items} />
            </div>

            <div className="w-full flex flex-col md:gap-6 gap-4 md:p-5 p-4 rounded-2xl bg-gray-100 dark:bg-gray-100/60 border border-amber-950 dark:border-gray-950">
              <div className="flex items-center gap-2">
                <img
                  src={ICONS.description}
                  className="w-auto max-h-5"
                  alt="description"
                />
                <div className="mb-0.5 sm:text-2xl text-lg font-bold leading-5">
                  Полное описание
                </div>
              </div>

              <div className="flex gap-4 flex-col">
                <div className="sm:text-xl font-bold">Характеристики</div>
                <CharacteristicsTable items={items} />
                <SellerInfo items={items} />
              </div>
            </div>
          </div>

          <div className="flex my-4 justify-center w-full flex-row flex-wrap gap-3">
            <Button
              value="Одобрить"
              className="max-w-fit bg-green-200/90 dark:bg-green-200/60"
              imageUrl={ICONS.approved}
              onClick={approve}
            />
            <Button
              value="Отклонить"
              className="max-w-fit bg-red-300/70"
              imageUrl={ICONS.reject}
              onClick={reject}
            />
            <Button
              value="Вернуть на доработку"
              className="max-w-fit bg-amber-300/60"
              imageUrl={ICONS.requestChanges}
              onClick={() => {
                setReason("pending");
                setIsModalOpen(true);
              }}
            />
          </div>

          <div className="flex flex-wrap justify-between w-full mb-8">
            <Link to={ROUTES.LIST}>
              <Button
                className="flex-row-reverse bg-amber-950/30 dark:bg-gray-600/70"
                classNameImage="rotate-180"
                value="К списку"
                imageUrl={ICONS.arrow}
              />
            </Link>
            <div className="flex items-center gap-3">
              {currentIndex > 0 && (
                <Link
                  to={ROUTES.CARD_DETAILS(
                    String(filteredAds[currentIndex - 1].id)
                  )}
                >
                  <Button
                    value="Предыдущее"
                    className="flex-row-reverse bg-amber-950/30 dark:bg-gray-600/70"
                    classNameImage="rotate-180 w-3"
                    imageUrl={ICONS.sliderArrow}
                  />
                </Link>
              )}

              {currentIndex < filteredAds.length - 1 && (
                <Link
                  to={ROUTES.CARD_DETAILS(
                    String(filteredAds[currentIndex + 1].id)
                  )}
                >
                  <Button
                    value="Следующее"
                    className="bg-amber-950/30 dark:bg-gray-600/70"
                    classNameImage="w-3"
                    imageUrl={ICONS.sliderArrow}
                  />
                </Link>
              )}
            </div>
          </div>

          <ModalReason
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
            action={reason}
          />
        </div>
      </div>
    </motion.div>
  );
};
