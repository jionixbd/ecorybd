"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const STACK_KEY = "web:nav-stack";
const INDEX_KEY = "web:nav-index";

function readState() {
  try {
    return {
      index: Number(sessionStorage.getItem(INDEX_KEY) ?? "-1"),
      stack: JSON.parse(sessionStorage.getItem(STACK_KEY) ?? "[]") as string[],
    };
  } catch {
    return { index: -1, stack: [] };
  }
}

function writeState(stack: string[], index: number) {
  sessionStorage.setItem(STACK_KEY, JSON.stringify(stack));
  sessionStorage.setItem(INDEX_KEY, String(index));
}

export function useNavStack() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [state, setState] = useState({ index: -1, stack: [] as string[] });

  useEffect(() => {
    const url = `${pathname}${search.size ? `?${search}` : ""}`;
    const { stack, index } = readState();

    let nextIndex: number;
    if (stack[index] === url) {
      nextIndex = index;
    } else if (stack[index + 1] === url) {
      nextIndex = index + 1;
    } else if (stack[index - 1] === url) {
      nextIndex = index - 1;
    } else {
      const next = [...stack.slice(0, index + 1), url];
      nextIndex = next.length - 1;
      writeState(next, nextIndex);
      setState({ index: nextIndex, stack: next });
      return;
    }

    writeState(stack, nextIndex);
    setState({ index: nextIndex, stack });
  }, [pathname, search]);

  useEffect(() => {
    const sync = () => {
      const { stack, index } = readState();
      setState({ index, stack });
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const back = () => {
    const { index } = readState();
    if (index > 0) {
      router.back();
    }
  };

  const forward = () => {
    const { stack, index } = readState();
    if (index < stack.length - 1) {
      router.forward();
    }
  };

  return {
    back,
    canGoBack: state.index > 0,
    canGoForward: state.index < state.stack.length - 1,
    forward,
  };
}
