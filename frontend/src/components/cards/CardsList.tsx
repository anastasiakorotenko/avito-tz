import type { CardItemProps, CardListProps } from "@/types/interfaces";
import Card from "./Card";

export const CardsList = ({ items, loading, error }: CardListProps) => {
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
  if (items.length === 0) return <p>Нет данных для отображения</p>;

  return (
    <div className="flex w-full gap-5 flex-col">
      {items.map((item: CardItemProps) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};
