import { NextResponse } from "next/server";

type PlacePrediction = {
  description: string;
  place_id: string;
  structured_formatting?: {
    secondary_text?: string;
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  if (!input || input.length < 2) {
    return NextResponse.json({ predictions: [] });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ predictions: [] });
  }

  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json"
  );
  url.searchParams.set("input", input);
  url.searchParams.set("types", "(cities)");
  url.searchParams.set("components", "country:fr");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());

  if (!res.ok) {
    return NextResponse.json({ predictions: [] });
  }

  const data = (await res.json()) as { predictions?: PlacePrediction[] };

  const predictions =
    data?.predictions?.map((p) => ({
      description: p.description,
      place_id: p.place_id,
      country_code:
        p.structured_formatting?.secondary_text?.split(",").pop()?.trim() ?? ""
    })) ?? [];

  return NextResponse.json({ predictions });
}

