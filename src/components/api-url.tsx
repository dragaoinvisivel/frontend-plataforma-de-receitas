import useApiUrl from "@/hooks/useApiUrl";
import { useEffect } from "react";
import { Badge } from "./ui/badge";

type Props = {};

export default function APIUrl({}: Props) {
  const { apiUrl, setApiUrl } = useApiUrl();

  useEffect(() => {
    const localApiUrl = localStorage.getItem("apiUrl");

    if (localApiUrl) {
      setApiUrl(localApiUrl);
    }
  }, []);
  return (
    <div>
      <div className="text-sm">
        <Badge className="shrink-0 max-h-min" variant="secondary">
          {apiUrl}
        </Badge>
      </div>
    </div>
  );
}
