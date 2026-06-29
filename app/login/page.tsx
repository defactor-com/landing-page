import { Suspense } from "react";
import Login from "@/components/sections/Login";

export default function Page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
