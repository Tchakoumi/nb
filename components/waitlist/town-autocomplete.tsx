"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIntl } from "react-intl";

type Prediction = {
  description: string;
  place_id: string;
  country_code: string;
};

type Props = {
  value: string;
  onChange: (value: {
    description: string;
    placeId: string;
    countryCode: string;
  }) => void;
  error?: string;
};

export function TownAutocomplete({ value, onChange, error }: Props) {
  const intl = useIntl();
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Prediction[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) return;

    const controller = new AbortController();

    if (!query || query.length < 2) {
      const id = window.setTimeout(() => {
        setResults([]);
        setOpen(false);
      }, 0);
      return () => {
        window.clearTimeout(id);
        controller.abort();
      };
    }

    const timeout = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?input=${encodeURIComponent(query)}`, {
          signal: controller.signal
        });
        if (!res.ok) return;
        const data = await res.json();
        setResults(data.predictions ?? []);
        setOpen(true);
      } catch {
        // ignore
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query, selected]);

  const selectPrediction = (prediction: Prediction) => {
    setSelected(true);
    setQuery(prediction.description);
    setOpen(false);
    setResults([]);
    onChange({
      description: prediction.description,
      placeId: prediction.place_id,
      countryCode: prediction.country_code
    });
  };

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => {
          setSelected(false);
          setQuery(e.target.value);
        }}
        placeholder={intl.formatMessage({
          id: "form.personal.town.placeholder"
        })}
        aria-invalid={!!error}
        aria-describedby={error ? "town-error" : undefined}
      />
      {open && results.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-border/40 bg-background shadow-lg">
          {results.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-muted/60"
              )}
              onClick={() => selectPrediction(prediction)}
            >
              {prediction.description}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p id="town-error" className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

