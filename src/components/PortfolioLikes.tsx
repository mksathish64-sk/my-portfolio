import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "../lib/supabase";

const VISITOR_ID_KEY = "portfolio_visitor_id";

type LikeStatus = "loading" | "ready" | "submitting" | "error";

function getVisitorId() {
  const createUuidV4 = () => {
    const bytes = new Uint8Array(16);

    try {
      if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
        crypto.getRandomValues(bytes);
      } else {
        for (let index = 0; index < bytes.length; index += 1) {
          bytes[index] = Math.floor(Math.random() * 256);
        }
      }
    } catch {
      for (let index = 0; index < bytes.length; index += 1) {
        bytes[index] = Math.floor(Math.random() * 256);
      }
    }

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));

    return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
  };

  let savedVisitorId: string | null = null;

  try {
    savedVisitorId = localStorage.getItem(VISITOR_ID_KEY);
  } catch {
    // localStorage can be unavailable in privacy-restricted browser contexts.
  }
  if (savedVisitorId) return savedVisitorId;

  let visitorId: string;
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      visitorId = crypto.randomUUID();
    } else {
      visitorId = createUuidV4();
    }
  } catch {
    visitorId = createUuidV4();
  }

  try {
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  } catch {
    // Keep the in-memory ID usable even if persistence is unavailable.
  }

  return visitorId;
}

export default function PortfolioLikes() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [status, setStatus] = useState<LikeStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const visitorIdRef = useRef<string | null>(null);
  const requestInFlightRef = useRef(false);
  const recoveryRequiredRef = useRef(false);

  const reloadVisitorState = async (id: string) => {
    const [countResult, likedResult] = await Promise.all([
      supabase.rpc("get_portfolio_like_count"),
      supabase.rpc("has_portfolio_liked", { p_visitor_id: id }),
    ]);

    if (countResult.error) throw countResult.error;
    if (likedResult.error) throw likedResult.error;

    setCount(Number(countResult.data) || 0);
    setLiked(Boolean(likedResult.data));
  };

  useEffect(() => {
    let active = true;

    const loadLikeStatus = async () => {
      try {
        const id = getVisitorId();
        visitorIdRef.current = id;
        const [countResult, likedResult] = await Promise.all([
          supabase.rpc("get_portfolio_like_count"),
          supabase.rpc("has_portfolio_liked", { p_visitor_id: id }),
        ]);

        if (countResult.error) throw countResult.error;
        if (likedResult.error) throw likedResult.error;
        if (!active) return;

        setVisitorId(id);
        setCount(Number(countResult.data) || 0);
        setLiked(Boolean(likedResult.data));
        setErrorMessage("");
        recoveryRequiredRef.current = false;
        setStatus("ready");
      } catch {
        if (!active) return;
        recoveryRequiredRef.current = true;
        setErrorMessage("Likes are temporarily unavailable.");
        setStatus("error");
      }
    };

    void loadLikeStatus();

    return () => {
      active = false;
    };
  }, []);

  const toggleLike = async () => {
    if (status === "error" && recoveryRequiredRef.current) {
      if (requestInFlightRef.current) return;

      requestInFlightRef.current = true;
      const id = visitorIdRef.current ?? getVisitorId();
      visitorIdRef.current = id;
      setVisitorId(id);
      setStatus("loading");
      setErrorMessage("");

      try {
        await reloadVisitorState(id);
        recoveryRequiredRef.current = false;
        setErrorMessage("");
        setStatus("ready");
      } catch {
        recoveryRequiredRef.current = true;
        setErrorMessage("Likes are temporarily unavailable.");
        setStatus("error");
      } finally {
        requestInFlightRef.current = false;
      }
      return;
    }

    if (!visitorId || status !== "ready" || requestInFlightRef.current) return;

    requestInFlightRef.current = true;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = liked
        ? await supabase.rpc("remove_portfolio_like", { p_visitor_id: visitorId })
        : await supabase.rpc("add_portfolio_like", { p_visitor_id: visitorId });

      if (result.error) throw result.error;

      const countResult = await supabase.rpc("get_portfolio_like_count");
      if (countResult.error) throw countResult.error;

      setCount(Number(countResult.data) || 0);
      setLiked(!liked);
      setErrorMessage("");
      setStatus("ready");
    } catch {
      try {
        await reloadVisitorState(visitorId);
        recoveryRequiredRef.current = false;
        setErrorMessage("Unable to update your like. Please try again.");
        setStatus("ready");
      } catch {
        recoveryRequiredRef.current = true;
        setErrorMessage("Unable to update your like. Likes could not be reloaded.");
        setStatus("error");
      }
    } finally {
      requestInFlightRef.current = false;
    }
  };

  return (
    <section className="mx-auto flex max-w-xl items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[0_20px_60px_-35px_rgba(34,211,238,0.45)]">
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold text-slate-200">Enjoyed my portfolio?</p>
        <p className="mt-1 font-mono text-[10px] tracking-wider text-slate-500">LEAVE A LIKE AND SHOW YOUR SUPPORT</p>
        {(status === "error" || errorMessage) && <p className="mt-2 text-xs text-red-300">{errorMessage}</p>}
      </div>

      <button
        type="button"
        onClick={() => void toggleLike()}
        disabled={status === "loading" || status === "submitting"}
        aria-label={liked ? "Unlike this portfolio" : "Like this portfolio"}
        aria-pressed={liked}
        className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-3.5 py-2.5 text-cyan-200 transition-colors hover:border-cyan-300/50 hover:bg-cyan-400/[0.12] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Heart size={17} className={liked ? "fill-rose-400 text-rose-400" : "transition-colors group-hover:text-rose-300"} />
        <span className="min-w-5 text-center font-mono text-xs font-semibold">
          {status === "loading" ? "..." : count ?? 0}
        </span>
      </button>
    </section>
  );
}
