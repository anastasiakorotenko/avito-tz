import useHotkeys from "@reecelucas/react-use-hotkeys";

interface UseModerationHotkeysProps {
  approve: () => void;
  reject: () => void;
  goNext: () => void;
  goPrev: () => void;
}

export const useModerationHotkeys = ({
  approve,
  reject,
  goNext,
  goPrev,
}: UseModerationHotkeysProps) => {
  useHotkeys("a", (e) => {
    e.preventDefault();
    approve();
  });

  useHotkeys("d", (e) => {
    e.preventDefault();
    reject();
  });

  useHotkeys("arrowleft", (e) => {
    e.preventDefault();
    goPrev();
  });

  useHotkeys("arrowright", (e) => {
    e.preventDefault();
    goNext();
  });
};
