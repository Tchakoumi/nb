"use client";

import { useState, useEffect, useCallback } from "react";

const SS_FALLBACK_KEY = "nb:waitlist:step";

function readHashStep<S extends string>(
  validSteps: readonly S[],
  fallback: S
): S {
  if (typeof window === "undefined") return fallback;

  const fromHash = window.location.hash.replace(/^#step=/, "");
  if (validSteps.includes(fromHash as S)) return fromHash as S;

  try {
    const fromStorage = sessionStorage.getItem(SS_FALLBACK_KEY);
    if (fromStorage && validSteps.includes(fromStorage as S))
      return fromStorage as S;
  } catch {
    // sessionStorage unavailable
  }

  return fallback;
}

export function useHashStep<S extends string>(
  fallback: S,
  validSteps: readonly S[]
): [S, (step: S) => void] {
  const [step, setStepState] = useState<S>(fallback);

  useEffect(() => {
    setStepState(readHashStep(validSteps, fallback));

    const onHashChange = () =>
      setStepState(readHashStep(validSteps, fallback));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStep = useCallback(
    (next: S) => {
      if (next === fallback) {
        // Going back to the landing step — clean hash
        history.replaceState(null, "", window.location.pathname);
      } else {
        history.pushState(null, "", `#step=${next}`);
      }

      try {
        sessionStorage.setItem(SS_FALLBACK_KEY, next);
      } catch {
        // sessionStorage unavailable
      }

      setStepState(next);
    },
    [fallback]
  );

  return [step, setStep];
}
