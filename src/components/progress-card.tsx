import { number } from "zod";
import { Progress } from "./ui/progress";

type Props = {
  value?: number;
  hideValue?: boolean;
};

export default function ProgressCard({ value = 0, hideValue = false }: Props) {
  return (
    <div className=" flex flex-col items-start gap-2 text-xs">
      <Progress value={Number(value)} />
      {hideValue ? null : (
        <code className="text-xs">{value.toFixed(2)}% concluído</code>
      )}
    </div>
  );
}
