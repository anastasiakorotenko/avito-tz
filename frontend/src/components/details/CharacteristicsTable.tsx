import type { CardItemProps } from "@/types/interfaces";
import React from "react";

interface CharacteristicsTableProps {
  items: CardItemProps;
}

export const CharacteristicsTable: React.FC<CharacteristicsTableProps> = ({ items }) => {
  return (
    <table className="min-w-full border border-gray-400 dark:border-gray-600 rounded-lg">
      <tbody>
        {Object.entries(items.characteristics).map(([key, value]) => (
          <tr key={key} className="border-b border-gray-400 dark:border-gray-600">
            <td className="sm:text-xl sm:px-3 px-1.5 sm:py-2 py-1 font-medium  border-r border-gray-400 dark:border-gray-600">
              {key}
            </td>
            <td className="sm:text-xl sm:px-3 px-1.5 sm:py-2 py-1">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
